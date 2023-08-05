const express = require('express');
const cloudinaryUploader = require('../config/cloudinaryConfig');
const upload = require('../helpers/multer');

const checkAuth = require('../middleware/checkAuthMiddleware');
const role = require('../middleware/roleMiddleware');
const createPhoto = require('../controllers/photo/createController');
const {
  getAllPhoto,
  getAllPhotoByItsUser,
} = require('../controllers/photo/getAllPhotoController');

const router = express.Router();

router.post('/create', checkAuth, createPhoto);
router.get('/all', getAllPhoto);
router.get('/user-all', checkAuth, getAllPhotoByItsUser);

router
  .route('/upload')
  .patch(checkAuth, upload.single('logo'), async (req, res) => {
    const localFilePath = req.file.path;
    const result = await cloudinaryUploader(localFilePath);

    res.status(200).json(result);
    //   res.send(localFilePath);
  });


module.exports = router;
