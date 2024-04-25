const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");
const CartRoute = require("./routes/cartRoute");
const OrderRoute = require("./routes/orderRoute");
const ItemRoute = require("./routes/itemRoutes");
const OfferRoute = require("./routes/offerRoute");
const userRoutes = require("./routes/user.route.js");
const authRoutes = require("./routes/auth.route.js");
const signinHistoryRoutes = require("./routes/signinHistory.route.js");
const feedbackRoute = require("./routes/feedbackRoute.js");
const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("uploads"));

app.use("/", CartRoute);
app.use("/", ItemRoute);
app.use("/", OrderRoute);
app.use("/", OfferRoute);
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", feedbackRoute);
app.use("/signinhistory", signinHistoryRoutes);

const port = 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
