const asyncHandler = require('express-async-handler');
const Category = require('../../models/categoryModel');
const User = require('../../models/userModel');

const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).exec();
  if (!categories) {
    return res.status(400).json({ message: 'No categories found' });
  }
  return res.status(200).json({
    success: true,
    message: 'All categories fetched successfully',
    categories,
  });
});

const getAllCategoryByItsUser = asyncHandler(async (req, res) => {
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

  const createdBy = existingUser._id;

  const categories = await Category.find({ createdBy }).exec();

  if (!categories) {
    return res.status(400).json({ message: 'No categories found' });
  }
  return res.status(200).json({
    success: true,
    message: `All categories created by ${existingUser.username} fetched successfully`,
    categories,
  });
});

module.exports = { getAllCategory, getAllCategoryByItsUser };
