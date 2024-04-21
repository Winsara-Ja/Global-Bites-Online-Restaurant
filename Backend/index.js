import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import signinHistoryRoutes from "./routes/signinHistory.route.js"
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

let MONGO_URL = process.env.MONGO_DB_URL;
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("💻 connected to MongoDB 🚀");
    })
    .catch((err) => console.log(err));

const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(express.json())
app.use(cookieParser());


app.listen(3000, () => {
    console.log("Server is listening on PORT  http://localhost:3000");
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/signinhistory', signinHistoryRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
})
