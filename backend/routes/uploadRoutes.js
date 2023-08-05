const express = require('express');
const cloudinaryUploader = require('../config/cloudinaryConfig');
const upload = require('../helpers/multer');
const router = express.Router();

router.route('/').patch(upload.single('logo'), async (req, res) => {
  const localFilePath = req.file.path;
  const result = await cloudinaryUploader(localFilePath);

  res.status(200).json(result);
});

module.exports = router;
