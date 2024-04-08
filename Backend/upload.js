const multer = require('multer')

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Specify the folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) 
  }
})

// Initialize multer upload instance
const upload = multer({ storage: storage })

module.exports = upload
