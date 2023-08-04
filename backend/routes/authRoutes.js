const express = require('express');
const router = express.Router();

const registerUser = require('../controllers/auth/registerController');
const verifyUserEmail = require('../controllers/auth/verifyEmailController');
const resendEmailToken = require('../controllers/auth/resendEmailController');
const loginUser = require('../controllers/auth/loginController');
const {
  resetPassworRequest,
  resetPassword,
} = require('../controllers/auth/resetPasswordController');
const getNewAccessToken = require('../controllers/auth/getNewAccessTokenController');
const logoutUser = require('../controllers/auth/logoutController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify', verifyUserEmail);
router.post('/resend_token', resendEmailToken);
router.post('/reset_password_request', resetPassworRequest);
router.post('/reset_password', resetPassword);
router.get('/get_nat', getNewAccessToken);
router.get('/logout', logoutUser);

module.exports = router;
