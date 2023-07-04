const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { startSession } = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const cors = require("cors");

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
  app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file);
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

  console.log("Mongoose Connected...");

  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

  app.listen(4000, () => console.log("Sever is running on port 4000"));
}

startServer();
