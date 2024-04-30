const express = require("express");
const router = express.Router();
const Item = require("../models/Inventory"); // Corrected path to ItemModel
const ItemController = require("../controllers/inventoryController"); // Corrected controller import

router.get("/inventory", ItemController.getAllItems);
router.get("/inventory/:id", ItemController.getItemById);
router.post("/addInventory", ItemController.addItem);
router.put("/updateInventory/:id", ItemController.updateItem);
router.delete("/deleteInventory/:id", ItemController.deleteItem);
module.exports = router;
