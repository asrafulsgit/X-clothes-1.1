const multer = require('multer')

const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, './images')
     },
     filename: function (req, file, cb) {
      const date = Date.now()
      const randomNumber = Math.floor((Math.random()+1)*100000)
       cb(null, file.fieldname+ randomNumber + '-'+ date + file.originalname)
      //  console.log(file)
     }
})
   
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2 MB limit
  }
})
module.exports= upload;
