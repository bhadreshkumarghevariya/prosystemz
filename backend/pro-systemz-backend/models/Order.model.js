const mongoose = require("mongoose");
const AddressSchema = require("./Address.model");
const CheckoutSchema = require("./Checkout.model");
const UserSchema = require("./User.model");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  checkout: { type: mongoose.Schema.Types.ObjectId, ref: "Checkout" },
  orderStatus: String,
  orderDate: String,
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
