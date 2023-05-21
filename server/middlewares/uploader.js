const multer = require('multer');
const { nanoid } = require("nanoid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + nanoid(7) + '.' + 
    file.originalname.split('.')[file.originalname.split('.').length -1])
  }
})

const upload = () => {
  return multer({ storage: storage, limits: { fileSize: '16mb' }})
  .fields([
    { name: 'image', maxCount: 10 },
    { name: 'file', maxCount: 10 },
  ])
}

module.exports = upload
