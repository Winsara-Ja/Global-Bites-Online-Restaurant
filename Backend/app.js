const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");
const UserRoutes = require("./routes/userAuthRoutes");
const CartRoute = require("./routes/cartRoute");
const OrderRoute = require("./routes/orderRoute");
const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", UserRoutes);
app.use("/", CartRoute);
app.use("/", OrderRoute);

const port = 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
