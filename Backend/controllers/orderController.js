const Order = require("../models/Order");

const OrderItem = async (req, res) => {
  try {
    const { cartItems, Total, userID } = req.body;
    const order = await Order.create({
      UserID: userID,
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
    const orderItems = await Order.find({});
    res.json(orderItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  OrderItem,
  getOrders,
};
