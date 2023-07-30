const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type ProductType {
    id: ID
    productTypeName: String
    customFields: JSON
    imageURL: String
  }

  type Product {
    id: ID
    productName: String
    productType: ProductType
    productShortDescription: String
    price: Float
    imageURL: String
    productDetails: JSON
  }

  type UserType {
    id: ID
    userTypeName: String
  }

  type Checkout {
    id: ID
    user: ID
    address: Address
    shoppingCart: ID
  }

  type Address {
    id: ID
    addressLine1: String
    addressLine2: String
    city: String
    state: String
    zipCode: String
    country: String
  }

  type Payment {
    id: ID
    method: String
    cardNumber: String
    cardExpiry: String
    cardCVV: String
    user: User
  }

  input PaymentInput {
    method: String
    cardNumber: String
    cardExpiry: String
    cardCVV: String
    userId: ID
  }

  type Order {
    id: ID
    user: User
    checkout: Checkout
    orderStatus: String
    orderDate: String
    payment: String
  }

  input OrderInput {
    userId: ID
    checkoutId: ID
    orderStatus: String
    orderDate: String
    paymentId: String
  }

  input AddressInput {
    addressLine1: String
    addressLine2: String
    city: String
    state: String
    zipCode: String
    country: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    userType: UserType
  }

  type Cart {
    id: ID
    products: [Product]
    user: ID
    cartName: String
    isAddedtoShoppingCart: Boolean
  }

  type ShoppingCart {
    id: ID
    products: [Product]
    carts: [Cart]
    user: ID
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getProductType: [ProductType]
    getCart(userId: ID): Cart
    getCartNotAddedToShoppingCart(id: ID, userId: ID): Cart
    getAllCartsForUser(userId: ID): [Cart]
    getAllProducts: [Product]
    getProduct(id: ID): Product
    getProductsByType(productType: ID!): [Product]
    getUser(id: ID!): User
    getUserDetails: User
    getAllUsers: [User]
    getAllUserTypes: [UserType]
    getShoppingCart(id: ID, userId: ID): ShoppingCart
    getCartId(userId: ID): ID
    getAllOrdersForUser(userId: ID!): [Order]
  }

  scalar JSON

  input productTypeInput {
    productTypeName: String
    customFields: JSON
    imageURL: String
  }

  input productInput {
    productName: String
    productType: ID
    productShortDescription: String
    price: Float
    imageURL: String
    productDetails: JSON
  }

  type Mutation {
    createProductType(
      productType: productTypeInput
      customFields: JSON
      imageURL: String
    ): ProductType
    createUserType(userTypeName: String): UserType
    createProduct(input: productInput): Product
    createCart(productId: ID, userId: ID): ID
    #shopping cart mutations
    createShoppingCartWithCartId(cartId: ID, userId: ID): ID
    createShoppingCartWithProductId(productId: ID, userId: ID): ID
    addProductToShoppingCart(
      ShoppingCartId: ID
      productId: ID
      userId: ID
    ): [Product]
    addProductToCart(CartId: ID, productId: ID, userId: ID): [Product]
    findExitingProductFromCart(CartId: ID, productId: ID): Product
    signup(
      username: String!
      email: String!
      password: String!
      userType: ID
    ): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createCheckout(
      userId: ID
      address: AddressInput
      shoppingCartId: ID
    ): Checkout
    createPayment(input: PaymentInput): Payment
    createOrder(input: OrderInput): Order
  }
`;

module.exports = typeDefs;
