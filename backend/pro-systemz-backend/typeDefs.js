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
    imageURL: String
  }

  type Cart {
    id: ID
    products: [Product]
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getProductType: [ProductType]
    getCart(id: ID): [Product]
    getAllProducts: [Product]
    getProduct(id: ID): Product
    getProductsByType(productType: ID!): [Product]
    getUser(id: ID!): User
  }

  input productTypeInput {
    productTypeName: String
  }

  input productInput {
    productName: String
    productType: ID
    productShortDescription: String
    price: Float
    imageURL: String
  }

  type Mutation {
    createProductType(productType: productTypeInput): ProductType
    createProduct(input: productInput): Product
    createCart(productId: ID): ID
    addProductToCart(CartId: ID, productId: ID): [Product]
    findExitingProductFromCart(CartId: ID, productId: ID): Product
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;
