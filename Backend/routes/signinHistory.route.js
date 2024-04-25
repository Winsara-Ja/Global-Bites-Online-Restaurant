const express = require("express");
const cors = require("cors");
const router = express.Router();
const {
  getSigninHistory,
} = require("../controllers/signinHistory.controller.js");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/history", getSigninHistory);

module.exports = router;
