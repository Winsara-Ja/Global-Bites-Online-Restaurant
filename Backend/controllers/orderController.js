const Order = require("../models/Order");

const OrderItem = async (req, res) => {
  try {
    const { cartItems, Total, userID, UserName } = req.body;
    const order = await Order.create({
      UserID: userID,
      UserName: UserName,
      ItemData: cartItems,
      TotalPrice: Total,
    });

    if (order) {
      return res.json({
        msg: "Oder Successfull",
      });
    }
    if (!order) {
      return res.json({
        error: "Something Went Wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getOrders = async (req, res) => {
  try {
    const userID = req.params.id;
    const orderItems = await Order.find({ UserID: userID });
    res.json(orderItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orderItems = await Order.find({});
    res.json(orderItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const ChangeStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    await Order.findByIdAndUpdate({ _id }, { PaymetStatus: status });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  OrderItem,
  getOrders,
  ChangeStatus,
  getAllOrders,
};
