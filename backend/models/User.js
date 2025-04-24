const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone: String,
  fullname: String,
  email: { type: String, unique: true },
  firebase_uid: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
