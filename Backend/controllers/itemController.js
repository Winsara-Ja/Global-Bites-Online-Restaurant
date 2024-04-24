const Item = require("../models/Items");

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    consol.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getSingleItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (error) {
    consol.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllItems,
  getSingleItem,
};
