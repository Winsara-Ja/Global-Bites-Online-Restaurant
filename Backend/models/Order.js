const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  UserID: String,
  ItemData: [
    {
      ItemID: String,
      ItemName: String,
      Quantity: Number,
      ItemPrice: Number,
    },
  ],
  TotalPrice: Number,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
