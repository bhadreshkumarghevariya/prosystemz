const mongoose = require("mongoose");

const ProductTypeSchema = new mongoose.Schema({
  productTypeName: {
    type: String,
    required: true,
  },
  customFields: [
    {
      type: Map,
      of: String,
    },
  ],
});

const ProductType = mongoose.model("productType", ProductTypeSchema);

module.exports = ProductType;
