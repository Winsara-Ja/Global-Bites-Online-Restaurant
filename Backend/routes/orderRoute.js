const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  OrderItem,
  getOrders,
  ChangeStatus,
  getAllOrders,
} = require("../controllers/orderController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/order", OrderItem);
router.get("/orderItems/:id", getOrders);
router.get("/orderItems", getAllOrders);
router.put("/order/status", ChangeStatus);

module.exports = router;
