const Item = require("../models/Inventory");

const getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find();
    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }
    return res.status(200).json({ items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getItemById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({ item });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addItem = async (req, res, next) => {
  const { image, name, category, company, quantity, price, total, date } = req.body;
  try {
    const newItem = new Item({
      image,
      name,
      category,
      company,
      quantity,
      price,
      total,
      date,
    });
    await newItem.save();
    return res.status(201).json({ item: newItem });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add item" });
  }
};

const updateItem = async (req, res, next) => {
  const id = req.params.id;
  const { image, name, category, company, quantity, price, total, date } = req.body;

  let item;

  try {
    item = await Item.findByIdAndUpdate(id, {
      image,
      name,
      category,
      company,
      quantity,
      price,
      total,
      date,
    });
    item = await item.save();
  } catch (err) {
    console.log(err);
  }
  if (!item) {
    return res.status(404).json({ message: "Unable to update item details" });
  }
  return res.status(200).json({ item });
};

const deleteItem = async (req, res, next) => {
  const id = req.params.id;

  let item;

  try {
    item = await Item.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!item) {
    return res.status(404).json({ message: "Unable to delete item details" });
  }
  return res.status(200).json({ item });
};

module.exports = {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
