const mongoose = require("mongoose")

const Offer = mongoose.Schema({
    offerId: String,
    offerName: String,
    promoCode: String,
    discount: String,
    image: String
  },{
    timestamps : true
})

const Offers = mongoose.model("Offers", Offer)

module.exports = Offers