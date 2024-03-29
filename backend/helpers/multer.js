const fs = require('fs');
const multer = require('multer');
const path = require('path');

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.originalname.split('.')[0]}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

function checkImageType(file, cb) {
  const filetypes = /jpeg|jpg|png|PNG|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Unsupported file format. You can only upload jpeg, jpg and png');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkImageType(file, cb);
  },
});

module.exports = upload;
