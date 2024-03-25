const Cart = require("../models/Cart");

const AddToCart = async (req, res) => {
  try {
    const { _id, ItemName, Description, Quantity, ItemPrice } = req.body;
    // console.log("ItemID: " + ItemID + " Item Name: " + ItemName);
    const cartItem = await Cart.create({
      _id,
      ItemName,
      Description,
      Quantity,
      ItemPrice,
    });

    if (cartItem) {
      return res.json({
        msg: "Item Added Successfully",
      });
    }
    if (!cartItem) {
      return res.json({
        error: "Something Went Wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const UpdateCartAdd = async (req, res) => {
  try {
    const { _id, Quantity } = req.body;
    await Cart.findByIdAndUpdate({ _id }, { Quantity: Quantity + 1 });
  } catch (error) {
    console.log(error);
  }
};

const UpdateCartRemove = async (req, res) => {
  try {
    const { _id, Quantity } = req.body;
    await Cart.findByIdAndUpdate({ _id }, { Quantity: Quantity - 1 });
  } catch (error) {
    console.log(error);
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({});
    res.json(cartItems);
  } catch (error) {
    consol.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  AddToCart,
  getCartItems,
  UpdateCartAdd,
  UpdateCartRemove,
};
