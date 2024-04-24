const Offers = require('../models/Offers')

const createOffer = async (req, res) => {
    try {
        const { offerId, offerName, promoCode, discount } = req.body
        const image = req.file ? req.file.filename : null;

        const newOffer = new Offers({
            offerId: offerId,
            offerName: offerName,
            promoCode: promoCode,
            discount: discount,
            image: image 
        })

        await newOffer.save()

        res.json({ success: true, message: "Data saved successfully", data: newOffer })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const deleteOffer = async (req, res) => {
    try{
      const id = req.params.id
      const data = await Offers.deleteOne({_id : id})
      res.send({success : true, message : "data deleted successfully", data : data})
    }catch (error){
      res.status(500).json({ success: false, message: error.message })
    }
      
  }

const getAllOffers = async (req, res) => {
    try {
      const offers = await Offers.find({})
      res.json(offers)
    } catch (error) {
      consol.log(error)
      res.status(500).json({ message: "Server error" })
    }
  };

  const getSingleOffer = async (req, res) => {
    try {
      const offer = await Offers.findById(req.params.id)
      res.json(offer)
    } catch (error) {
      consol.log(error)
      res.status(500).json({ message: "Server error" })
    }
  }; 

  const updateOffer = async (req, res) => {

    const id = req.params.id
    const {offerId, offerName, promoCode, discount, image} = req.body
    try{
      const data = await Offers.findByIdAndUpdate( id, {
          offerId: offerId,
          offerName: offerName,
          promoCode: promoCode,
          discount: discount,
          image: image 
      })
      res.send({success : true, message : "data updated successfully", data : data})
    }catch (error) {
      res.status(500).json({ success: false, message: error.message })
    }
      
  };

module.exports = {
    deleteOffer,
    createOffer,
    getAllOffers,
    updateOffer,
    getSingleOffer
}  