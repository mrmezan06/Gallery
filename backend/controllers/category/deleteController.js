const asyncHandler = require('express-async-handler');
const Category = require('../../models/categoryModel');
const User = require('../../models/userModel');

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id).exec();
  if (!category) {
    return res.status(400).json({ message: 'Category does not exist' });
  }

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

  if (category.createdBy.toString() !== existingUser._id.toString()) {
    return res
      .status(401)
      .json({ message: 'You are not authorized to delete this category' });
  }
  await Category.findByIdAndDelete(id).exec();
  return res.status(200).json({ message: 'Category deleted successfully' });
});

module.exports = deleteCategory;
