const express = require('express');
const router = express.Router();

const getUserProfile = require('../controllers/user/getUserProfileController');
const checkAuth = require('../middleware/checkAuthMiddleware');
const updateUserController = require('../controllers/user/updateUserController');

router.get('/profile', checkAuth, getUserProfile);
router.patch('/profile', checkAuth, updateUserController);

module.exports = router;
