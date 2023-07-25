const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
