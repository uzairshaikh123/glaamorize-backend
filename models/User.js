const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "admin", "vendor"],
    default: "customer",
  },
  // Additional user information fields (e.g., name, address, phone)
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
