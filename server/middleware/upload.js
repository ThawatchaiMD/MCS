const multer  = require('multer')

const storageBuilding = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/building')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `./uploads/building/${uniqueSuffix}-${file.originalname}`)
    }
  })
  
exports.uploadBuilding = multer({ storage: storageBuilding }).single('file')

const storageGateway = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/gateway')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,  uniqueSuffix + '-' + file.originalname)
  }
})

exports.uploadGateway = multer({ storage: storageGateway }).single('file')

const storageUnit = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/unit')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,  uniqueSuffix + '-' + file.originalname)
  }
})

exports.uploadUnit = multer({ storage: storageUnit }).single('file')

const storageDevice = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/device')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,  'http://127.0.0.1:3000/uploads/building/'+ uniqueSuffix + '-' + file.originalname)
  }
})

exports.uploadDevice = multer({ storage: storageDevice }).single('file')