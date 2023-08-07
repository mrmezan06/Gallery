const express = require('express');
const cloudinaryUploader = require('../config/cloudinaryConfig');
const upload = require('../helpers/multer');
const router = express.Router();


router.route('/').patch(upload.single('logo'), async (req, res) => {
  const localFilePath = req.file.path;
  const result = await cloudinaryUploader(localFilePath);

  res.status(200).json(result);
});


const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/delete').patch(async (req, res) => {
  const publicId = req.body.publicId;

  cloudinary.uploader
    .destroy(publicId)
    .then((result) => {
      res.status(200).json({ success: true, message: 'Success' });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: 'Fail' });
    });
});

module.exports = router;
