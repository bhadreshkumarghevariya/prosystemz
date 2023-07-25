const mongoose = require("mongoose");
const ShoppingCartSchema = require("./ShoppingCart.model");
const UserSchema = require("./User.model");

const AddressSchema = new mongoose.Schema({
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
});

const CheckoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: AddressSchema,
  shoppingCart: { type: mongoose.Schema.Types.ObjectId, ref: "ShoppingCart" },
});

const Checkout = mongoose.model("Checkout", CheckoutSchema);

module.exports = Checkout;
