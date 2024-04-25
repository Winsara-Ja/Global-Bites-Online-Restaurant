const express = require("express")
const router = express.Router()
const upload = require('../upload')

const {createOffer, deleteOffer, getAllOffers, updateOffer, getSingleOffer} = require("../controllers/offerController")

router.post("/createOffer", upload.single("image"), createOffer)
router.delete("/deleteOffer/:id", deleteOffer)
router.get("/offers", getAllOffers)
router.post("/updateOffer/:id", updateOffer)
router.get("/offers/:id", getSingleOffer)

module.exports = router