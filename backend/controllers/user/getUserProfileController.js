const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const Photo = require('../../models/photoModel');
const Category = require('../../models/categoryModel');

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

  const countPhotos = await Photo.countDocuments({ createdBy: userId });
  const countCategories = await Category.countDocuments({ createdBy: userId });

  res.status(200).json({
    success: true,
    userProfile,
    countPhotos,
    countCategories,
  });
});

module.exports = getUserProfile;
