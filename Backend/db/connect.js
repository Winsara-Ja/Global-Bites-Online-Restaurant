const mongoose = require("mongoose");

const Url = "mongodb+srv://hettigetasini:tashini123@cluster0.inhjvbj.mongodb.net/Catering?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(Url);
    console.log("Connected to the Database");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
