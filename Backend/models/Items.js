const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  ItemID: String,
  ItemName: String,
  Img: String,
  Description: String,
  Price: Number,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
