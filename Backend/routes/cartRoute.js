const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  AddToCart,
  getCartItems,
  UpdateCartAdd,
  UpdateCartRemove,
  DeleteItem,
} = require("../controllers/cartController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/items", AddToCart);
router.get("/cart", getCartItems);
router.put("/update/add", UpdateCartAdd);
router.put("/update/remove", UpdateCartRemove);
router.delete("/item/delete/:id", DeleteItem);

module.exports = router;
