const express = require('express');
const router = express.Router();

const registerUser = require('../controllers/auth/registerController');
const verifyUserEmail = require('../controllers/auth/verifyEmailController');
const resendEmailToken = require('../controllers/auth/resendEmailController');
const loginUser = require('../controllers/auth/loginController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify', verifyUserEmail);
router.post('/resend_token', resendEmailToken);

module.exports = router;
