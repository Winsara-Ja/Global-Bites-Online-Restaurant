const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  AddToCart,
  getCartItems,
  UpdateCartAdd,
  UpdateCartRemove,
} = require("../controllers/cartController");

router.use(cors());

router.post("/items", AddToCart);
router.get("/cart", getCartItems);
router.put("/update/add", UpdateCartAdd);
router.put("/update/remove", UpdateCartRemove);

module.exports = router;
