const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const updateUserController = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res
      .status(401)
      .json({ message: 'You are not authorized to access this route' });
  }

  const refreshToken = cookies.jwt;

  // Find Currently Logged In User
  const existingUser = await User.findOne({ refreshToken }).exec();
  if (!existingUser) {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY,
      async (err, decode) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid refresh token' });
        }
        const hackedUser = await User.findById(decode.id).exec();
        hackedUser.refreshToken = [];
        await hackedUser.save();
        return res
          .status(403)
          .json({ message: 'Malicious activity detected. Please login again' });
      }
    );
  }

  const userId = existingUser._id;

  if (req.body.password === '') {
    delete req.body.password;
  } else if (req.body.password) {
    if (!validator.isStrongPassword(req.body.password)) {
      return res.status(400).json({
        success: false,
        message:
          'Password must be at least 8 characters long, with at least 1 uppercase and lowercase letters and at least 1 symbol',
      });
    }

    // hash password

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateAvatarController = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res
      .status(401)
      .json({ message: 'You are not authorized to access this route' });
  }

  const refreshToken = cookies.jwt;

  // Find Currently Logged In User
  const existingUser = await User.findOne({ refreshToken }).exec();
  if (!existingUser) {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY,
      async (err, decode) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid refresh token' });
        }
        const hackedUser = await User.findById(decode.id).exec();
        hackedUser.refreshToken = [];
        await hackedUser.save();
        return res
          .status(403)
          .json({ message: 'Malicious activity detected. Please login again' });
      }
    );
  }

  const userId = existingUser._id;

  const url = req.body.url;
  const publicId = req.body.publicId;
  if (!url) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a url',
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: url, publicId: publicId },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { updateUserController, updateAvatarController };
