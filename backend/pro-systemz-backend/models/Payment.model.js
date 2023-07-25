const mongoose = require("mongoose");
require("./User.model");
const PaymentSchema = new mongoose.Schema({
  method: String,
  cardNumber: String,
  cardExpiry: String,
  cardCVV: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
