const mongoose = require("mongoose");

const UserTypeSchema = new mongoose.Schema({
  userTypeName: {
    type: String,
    required: true,
  },
});

const UserType = mongoose.model("userType", UserTypeSchema);
module.exports = UserType;
