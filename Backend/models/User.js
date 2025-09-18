const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },     // unique
  username: { type: String, required: true, unique: true },  // unique
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
