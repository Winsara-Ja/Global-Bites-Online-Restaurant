const mongoose = require("mongoose");

const catringSchema = new mongoose.Schema({
    date:String,
    place:String,
    dilivery_options:String,
    headcount:String,
},{
    timestamps:true

});

const Catering = mongoose.model("Catering", catringSchema);

module.exports = Catering;