const mongoose = require("mongoose");
require("./Product.model");

const CartSchema = new mongoose.Schema({
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "product",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cartName: {
    type: String,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
