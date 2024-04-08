const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");
const UserRoutes = require("./routes/userAuthRoutes");
const ItemRoutes = require("./routes/itemRoutes");
const CartRoute = require("./routes/cartRoute");
const OrderRoute = require("./routes/orderRoute");
const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", UserRoutes);
app.use("/", ItemRoutes);
app.use("/", CartRoute);
app.use("/", OrderRoute);

app.get('/getfeedback',(req,res) => {
    UserModel.find({})
    .then(feedbacks =>res.json(feedbacks))
    .catch(err => res.json(err))
})

app.get('/getFeedback/:id',(req,res) => {
    const id=req.params.id;
    UserModel.findById({_id:id})
    .then(feedbacks =>res.json(feedbacks))
    .catch(err => res.json(err))
})

app.put('/updateFeedback/:id',(req,res) => {
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        feedback:req.body.feedback})
    .then(feedbacks =>res.json(feedbacks))
    .catch(err => res.json(err))
})

app.delete('/deleteFeedback/:id',(req,res) => {
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post("/createfeedback",(req,res) => {
    UserModel.create(req.body)
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err))
})

const port = 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
