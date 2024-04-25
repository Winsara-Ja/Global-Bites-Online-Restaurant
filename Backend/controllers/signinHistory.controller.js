const SigninHistory = require("../models/signin.history.js");

exports.getSigninHistory = async (req, res, next) => {
  try {
    const signinHistory = await SigninHistory.find().sort({ signinDate: -1 });
    res.status(200).json(signinHistory);
  } catch (error) {
    next(error);
  }
};
