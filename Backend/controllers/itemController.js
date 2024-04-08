const Items = require("../models/Items")

const getAllItems = async (req, res) => {
    try {
      const items = await Items.find({})
      res.json(items)
    } catch (error) {
      consol.log(error)
      res.status(500).json({ message: "Server error" })
    }
  };

const getSingleItem = async (req, res) => {
    try {
      const item = await Items.findById(req.params.id)
      res.json(item)
    } catch (error) {
      consol.log(error)
      res.status(500).json({ message: "Server error" })
    }
  }; 

const createItem = async (req, res) => {
    try {
        const { itemId, itemName, Description, Price, category, country } = req.body
        const image = req.file ? req.file.filename : null;

        const newItem = new Items({
            itemId: itemId,
            itemName: itemName,
            Description: Description,
            Price: Price,
            category: category,
            country: country,
            image: image 
        })

        await newItem.save()

        res.json({ success: true, message: "Data saved successfully", data: newItem })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const deleteItem = async (req, res) => {
  const id = req.params.id
    console.log(id)
    const data = await Items.deleteOne({_id : id})
    res.send({success : true, message : "data deleted successfully", data : data})
}

const updateItem = async (req, res) => {
  console.log(req.body)
    const { id,...rest} = req.body

    console.log(rest)
    const data = await Items.updateOne({_id : _id}, rest)
    res.send({success : true, message : "data updated successfully", data : data})
};

  
module.exports = {
    getAllItems,
    getSingleItem,
    createItem,
    deleteItem,
    updateItem
  }