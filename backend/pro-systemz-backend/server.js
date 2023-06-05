const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { startSession } = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app, path: "/graphql" });

  app.use((req, res) => {
    res.send("hello from express apollo server");
  });
  const connectionString =
    "mongodb+srv://bhadreshkumarghevariya:bhadobhado@pscluster1.ixor0hh.mongodb.net/?retryWrites=true&w=majority";

  await mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("Mongoose Connected...");

  app.listen(4000, () => console.log("Sever is running on port 4000"));
}

startServer();
