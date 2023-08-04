const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const userProfile = await User.findById(userId, {
    refreshToken: 0,
    roles: 0,
    _id: 0,
  }).lean();

  if (!userProfile) {
    return res.status(404).json({
      success: false,
      message: 'User profile not found',
    });
  }

  res.status(200).json({
    success: true,
    userProfile,
  });
});

module.exports = getUserProfile;
