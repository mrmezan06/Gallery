const express = require('express');

const checkAuth = require('../middleware/checkAuthMiddleware');
const role = require('../middleware/roleMiddleware');
const createPhoto = require('../controllers/photo/createController');

const router = express.Router();

router.post('/create', checkAuth, createPhoto);

module.exports = router;
