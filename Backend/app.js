const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");
const UserRoutes = require("./routes/userAuthRoutes");
const ItemRoutes = require("./routes/itemRoutes");
const CartRoute = require("./routes/cartRoute");
const OrderRoute = require("./routes/orderRoute");
const app = express();
const Catering = require("./models/Catering");

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", UserRoutes);
app.use("/", ItemRoutes);
app.use("/", CartRoute);
app.use("/", OrderRoute);


//read
app.get("/getcatering",async(req,res)=>{
    const data= await Catering.find({})
  
    res.json({success:true,data:data})
})

//create
app.post("/catering/create",async(req,res)=>{
    const data= Catering(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
})

//update
app.put("/catering/update",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await Catering.updateOne({_id:id},rest)
    res.send({success:true,message:"updated successfuly",data:data})
})



//delete
app.delete("/catering/delete/:id",async(req,res)=>{
const id=req.params.id
const data=await Catering.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})




//fetch to update details
app.get("/catering/user/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const discount = await Catering.findById(id);

        if (!discount) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: discount });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});
app.get("/count",async(req,res)=>{
    try{
        const users=await Catering.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"distributor count successfully",data:data})
    }

})


const port = 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
