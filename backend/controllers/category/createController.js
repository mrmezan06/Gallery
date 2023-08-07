const asyncHandler = require('express-async-handler');
const Category = require('../../models/categoryModel');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const Photo = require('../../models/photoModel');

const createCategory = asyncHandler(async (req, res) => {
  const { categoryName, posterPhotoURL, ...rest } = req.body;

  if (!categoryName) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  if (!posterPhotoURL) {
    return res.status(400).json({ message: 'Poster photo URL is required' });
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

  const createdBy = existingUser._id;

  const existingCategory = await Category.findOne({ categoryName }).exec();
  if (existingCategory) {
    return res.status(400).json({ message: 'Category already exists' });
  }

  //   replace multiple spaces with one hiphen
  // categoryName = categoryName.replace(/\s+/g, '-').toLowerCase();

  //   select from req.body without categoryName and posterPhotoURL
  //   const { categoryName, posterPhotoURL, ...rest } = req.body;

  const newCategory = new Category({
    category: categoryName.replace(/\s+/g, '-').toLowerCase(),
    categoryName,
    posterPhotoURL,
    createdBy,
    ...rest,
  });

  const createdCategory = await newCategory.save();

  if (createdCategory) {
    //   create a new photo document
    const newPhoto = new Photo({
      name: categoryName,
      categoryId: createdCategory._id,
      url: posterPhotoURL,
      createdBy,
    });

    const createdPhoto = await newPhoto.save();

    return res.status(201).json({
      message: 'New Category Created Successfully',
      category: createdCategory,
      photo: createdPhoto,
    });
  }
  return res.status(500).json({ message: 'Error in creating category' });
});

module.exports = createCategory;
