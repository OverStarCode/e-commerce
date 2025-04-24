const mongoose = require("mongoose");

const basketSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Basket", basketSchema);
