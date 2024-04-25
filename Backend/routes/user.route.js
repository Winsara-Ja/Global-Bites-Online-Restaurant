const express = require("express");
const cors = require("cors");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  deleteOneUser,
  updateOneUser,
} = require("../controllers/user.controllers.js");
const { verifyToken } = require("../utils/verifyToken.js");
const router = express.Router();

router.use(cors());

router.get("/users", getAllUsers);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.delete("/deleteone/:id", deleteOneUser);
router.put("/updateone/:id", updateOneUser);

module.exports = router;
