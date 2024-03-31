const Order = require("../models/Order");

const UserID = "ja_2075";
const OrderItem = async (req, res) => {
  try {
    const { _id, ItemName, Quantity, ItemPrice, Total } = req.body;
    const order = await Order.create({
      UserID: UserID,
      ItemData: [
        {
          ItemID: _id,
          ItemName: ItemName,
          Quantity: Quantity,
          ItemPrice: ItemPrice,
        },
      ],
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

module.exports = {
  OrderItem,
};
