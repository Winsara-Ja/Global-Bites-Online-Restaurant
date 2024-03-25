const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  ItemID: String,
  ItemName: String,
  Description: String,
  Quantity: Number,
  ItemPrice: Number,
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
