const express = require('express');
const router = express.Router();

const getUserProfile = require('../controllers/user/getUserProfileController');
const checkAuth = require('../middleware/checkAuthMiddleware');

router.get('/profile', checkAuth, getUserProfile);

module.exports = router;
