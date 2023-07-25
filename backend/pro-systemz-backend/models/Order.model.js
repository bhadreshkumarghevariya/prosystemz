const mongoose = require("mongoose");
const AddressSchema = require("./Address.model");
require("./Payment.model");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  checkout: { type: mongoose.Schema.Types.ObjectId, ref: "Checkout" },
  orderStatus: String,
  orderDate: String,
  payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
