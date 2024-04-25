const mongoose = require("mongoose");

const signinHistorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  signinDate: {
    type: Date,
    default: Date.now,
  },
});

const SigninHistory = mongoose.model("SigninHistory", signinHistorySchema);
module.exports = SigninHistory;
