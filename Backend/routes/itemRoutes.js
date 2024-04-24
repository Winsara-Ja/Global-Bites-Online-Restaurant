const express = require("express");
const router = express.Router();

const { getAllItems, getSingleItem } = require("../controllers/itemController");
// Get all Items
router.get("/items", getAllItems);
router.get("/items/:id", getSingleItem);

module.exports = router;
