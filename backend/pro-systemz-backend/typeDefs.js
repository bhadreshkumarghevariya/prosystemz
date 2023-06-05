const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type ProductType {
    id: ID
    productTypeName: String
  }

  type Query {
    getProductType: [ProductType]
  }

  input productTypeInput {
    productTypeName: String
  }

  type Mutation {
    createProductType(productType: productTypeInput): ProductType
  }
`;

module.exports = typeDefs;
