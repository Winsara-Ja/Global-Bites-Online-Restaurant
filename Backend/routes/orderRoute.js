const express = require("express");
const router = express.Router();
const cors = require("cors");
const { OrderItem } = require("../controllers/orderController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/order", OrderItem);

module.exports = router;
