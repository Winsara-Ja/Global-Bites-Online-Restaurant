const Cart = require("../models/Cart");

const AddToCart = async (req, res) => {
  try {
    const { _id, ItemName, Description, Quantity, ItemPrice, userID } =
      req.body;
    const cartItem = await Cart.create({
      ItemID: _id,
      ItemName: ItemName,
      Description: Description,
      Quantity: Quantity,
      ItemPrice: ItemPrice,
      UserID: userID,
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
    if (Quantity == 0) {
      DeleteItem();
    }
  } catch (error) {
    console.log(error);
  }
};

const DeleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    await Cart.findByIdAndDelete({ _id: id });
  } catch (error) {
    console.log(error);
  }
};

const getCartItems = async (req, res) => {
  try {
    const userID = req.params.id;
    const cartItems = await Cart.find({ UserID: userID });
    res.json(cartItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  AddToCart,
  getCartItems,
  UpdateCartAdd,
  UpdateCartRemove,
  DeleteItem,
};
