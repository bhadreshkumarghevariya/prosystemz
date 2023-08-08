const mongoose = require("mongoose");
require("./Product.model");
require("./Cart.model");

const ShoppingCartSchema = new mongoose.Schema({
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "product",
  },
  carts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Cart",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //status to check if the cart is active or not
  status: {
    type: String,
    default: "Active",
  },
});

const Cart = mongoose.model("ShoppingCart", ShoppingCartSchema);

module.exports = Cart;
