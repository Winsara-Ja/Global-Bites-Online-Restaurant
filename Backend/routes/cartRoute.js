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

router.post("/addtocart", AddToCart);
router.get("/cart/:id", getCartItems);
router.put("/update/add", UpdateCartAdd);
router.put("/update/remove", UpdateCartRemove);
router.delete("/item/delete/:id", DeleteItem);

module.exports = router;
