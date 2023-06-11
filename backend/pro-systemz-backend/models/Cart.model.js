const mongoose = require("mongoose");
require("./Product.model");

const CartSchema = new mongoose.Schema({
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "product",
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
