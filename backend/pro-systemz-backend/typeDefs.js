const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type ProductType {
    id: ID
    productTypeName: String
  }

  type Product {
    id: ID
    productName: String
    productType: ProductType
    productShortDescription: String
    price: Float
  }

  type Query {
    getProductType: [ProductType]
    getAllProducts: [Product]
    getProduct(id: ID): Product
    getProductsByType(productType: ID!): [Product]
  }

  input productTypeInput {
    productTypeName: String
  }

  input productInput {
    productName: String
    productType: ID
    productShortDescription: String
    price: Float
  }

  type Mutation {
    createProductType(productType: productTypeInput): ProductType
    createProduct(input: productInput): Product
  }
`;

module.exports = typeDefs;
