const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    UserID: String,
    UserName: String,
    ItemData: [
      {
        ItemID: String,
        ItemName: String,
        Quantity: Number,
        ItemPrice: Number,
      },
    ],
    TotalPrice: Number,
    PaymetStatus: {
      type: String,
      default: "Processing",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
