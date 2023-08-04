const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const checkAuth = asyncHandler(async (req, res, next) => {
  let jwt_token;

  // Bearer sdfasdfasdfasdfsd

  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401);

  if (authHeader && authHeader.startsWith('Bearer')) {
    jwt_token = authHeader.split(' ')[1];

    jwt.verify(
      jwt_token,
      process.env.JWT_ACCESS_SECRET_KEY,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);

        const userId = decoded.id;
        // req.user = await User.findById(userId).select('-password');
        const user = await User.findById(userId).select('-password');

        if (user.refreshToken.includes(decoded.refreshToken)) {
          req.user = user;
          req.roles = decoded.roles;
        } else {
          return res.status(403).json({
            message: 'Please login again',
          });
        }

        next();
      }
    );
  }
});

module.exports = checkAuth;
