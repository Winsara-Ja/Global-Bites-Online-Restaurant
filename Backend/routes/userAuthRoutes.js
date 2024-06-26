const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  Login,
  Register,
  getProfile,
} = require("../controllers/userControllers");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/login", Login);
router.post("/register", Register);
router.get("/profile", getProfile);

module.exports = router;
