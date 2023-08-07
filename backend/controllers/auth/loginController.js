const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'An username/email and password are required',
    });
  }

  let existingUser = await User.findOne({ username }).select('+password');

  if (!existingUser) {
    existingUser = await User.findOne({ email: username }).select('+password');
  }

  if (!existingUser || !(await existingUser.comparePassword(password))) {
    return res.status(401).json({
      message: 'Incorrect username/email or password',
    });
  }

  if (!existingUser.isEmailVerified) {
    return res.status(400).json({
      message:
        'Verify the account by clicking on the link sent to your email address',
    });
  }

  if (!existingUser.active) {
    return res.status(400).json({
      message:
        'You have been blocked by the admin. Contact the admin for more information',
    });
  }

  if (existingUser && (await existingUser.comparePassword(password))) {
    const newRefreshToken = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: '7d' }
    );

    const cookies = req.cookies;

    let newRefreshTokenArray = !cookies?.jwt
      ? existingUser.refreshToken
      : existingUser.refreshToken.filter((refT) => refT !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const existingRefreshToken = await User.findOne({
        refreshToken,
      }).exec();

      if (!existingRefreshToken) {
        newRefreshTokenArray = [];
      }

      const options = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'None',
      };

      res.clearCookie('jwt', options);
    }

    existingUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await existingUser.save();

    const options = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None',
    };

    res.cookie('jwt', newRefreshToken, options);

    const accessToken = jwt.sign(
      {
        id: existingUser._id,
        roles: existingUser.roles,
        refreshToken: newRefreshToken,
      },
      process.env.JWT_ACCESS_SECRET_KEY,
      { expiresIn: '1d' }
    );

    // update the user's last login date
    existingUser.lastLogin = Date.now();
    await existingUser.save();

    res.status(200).json({
      success: true,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        username: existingUser.username,
        email: existingUser.email,
        provider: existingUser.provider,
        avatar: existingUser.avatar,
        roles: existingUser.roles,
        accessToken,
      },
      message: 'Logged in successfully',
    });
  } else {
    return res.status(401).json({
      message: 'Invalid credentials provided',
    });
  }
});

module.exports = loginUser;
