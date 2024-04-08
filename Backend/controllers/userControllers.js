const User = require("../models/Users");
const { hashPassword, comparePassword } = require("../helpers/encrypt");
const jwt = require("jsonwebtoken");

const secret = "GlobalBites";
// Login endpoint
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    // check password
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      return res.json({
        error: "Passwords Does not Match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Register endpoint
const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!password || password.lenght < 6) {
      return res.json({
        error: "Password must be 6 Characters",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is Taken",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      return res.json({
        msg: "User Created Successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secret, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  Login,
  Register,
  getProfile,
};
