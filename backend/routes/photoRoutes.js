const express = require('express');

const checkAuth = require('../middleware/checkAuthMiddleware');

const createPhoto = require('../controllers/photo/createController');
const {
  getAllPhoto,
  getAllPhotoByItsUser,
  getAllPhotoByItsCategory,
} = require('../controllers/photo/getAllPhotoController');

const router = express.Router();

router.post('/create', checkAuth, createPhoto);
router.get('/all', getAllPhoto);
router.get('/user-all', checkAuth, getAllPhotoByItsUser);
router.get('/get/:id', getAllPhotoByItsCategory);

module.exports = router;
