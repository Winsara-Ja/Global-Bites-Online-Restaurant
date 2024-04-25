const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  signin,
  signup,
  google,
  signout,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controllers.js");

router.use(cors());

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signout);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);

module.exports = router;
