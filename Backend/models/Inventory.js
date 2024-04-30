const mongoose = require("mongoose");


const itemSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  total: Number, // Change to Number, remove 'required'
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Inventory", itemSchema);
