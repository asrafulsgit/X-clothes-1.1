const multer = require('multer')
const fs = require('fs');

const imagesDir = './images';
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir);  
  },
  filename: function (req, file, cb) {
    const date = Date.now();
    const randomNumber = Math.floor(Math.random() * 100000); // More robust random number generation
    cb(null, `${file.fieldname}-${randomNumber}-${date}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2 MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const mimeType = allowedTypes.test(file.mimetype); 

    if (mimeType) {
      return cb(null, true); 
    } else {
      return cb(new Error('Invalid file type, only JPG, JPEG, PNG files are allowed.'));
    }
  },
});

 

module.exports= upload;
