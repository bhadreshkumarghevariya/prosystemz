const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { startSession } = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NZNQ6JFJfq9k7DY2kwB0LC55Rw3EZLYspwv7iY2ZlUeh5M4YefVctnmTDbjYO6Rj1FbBRAJjzjTeX0ZBQ2a0UN600X9JiVEST"
);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

const chargeCustomer = async (customerId) => {
  // Lookup the payment methods available for the customer
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: "card",
  });
  try {
    // Charge the customer and payment method immediately
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "cad",
      customer: customerId,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
    });
  } catch (err) {
    // Error code will be authentication_required if authentication is needed
    console.log("Error code is: ", err.code);
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
      err.raw.payment_intent.id
    );
    console.log("PI retrieved: ", paymentIntentRetrieved.id);
  }
};

const storage = multer.diskStorage({
  destination: "uploads/images",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalName = file.originalname;
    const fileExtension = originalName.split(".").pop();
    const fileName = `${uniqueSuffix}.${fileExtension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

async function startServer() {
  const app = express();
  app.use(cors());

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      return { token };
    },
  });
  app.use(express.json());

  app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    console.log(req.body);

    // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
    // and attach the PaymentMethod to a new Customer
    const customer = await stripe.customers.create();

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      setup_future_usage: "off_session",
      amount: calculateOrderAmount(items),
      // amount: 1400,
      currency: "cad",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

  app.post("/upload", upload.single("file"), (req, res) => {
    res.json({ file: req.file });
  });

  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app, path: "/graphql" });

  app.use((req, res) => {
    res.send("hello from express apollo server");
  });
  //   const connectionString =
  //     "mongodb+srv://bhadreshkumarghevariya:bhadobhado@pscluster1.ixor0hh.mongodb.net/?retryWrites=true&w=majority";

  const connectionString =
    "mongodb+srv://bhadreshkumarghevariya:bhadobhado@pscluster1.ixor0hh.mongodb.net/proSystemz1";
  await mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

  app.listen(4000, () => console.log("Sever is running on port 4000"));
}

startServer();
