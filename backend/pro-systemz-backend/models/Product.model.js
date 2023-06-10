const mongoose = require("mongoose");
require("./ProductType.model");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productType",
    required: true,
  },
  productShortDescription: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
