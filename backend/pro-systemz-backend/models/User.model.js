const mongoose = require("mongoose");
require("./UserType.Model");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userType",
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
