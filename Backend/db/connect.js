const mongoose = require("mongoose");

const Url = "mongodb://localhost:27017/Test1";

const connectDB = async () => {
  try {
    await mongoose.connect(Url);
    console.log("Connected to the Database");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;

//
