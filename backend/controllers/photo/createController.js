const asyncHandler = require('express-async-handler');
const Category = require('../../models/categoryModel');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const Photo = require('../../models/photoModel');

const createPhoto = asyncHandler(async (req, res) => {
  const { photoName, categoryId, photoUrl, publicId, place } = req.body;

  if (!photoName) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  if (!photoUrl) {
    return res.status(400).json({ message: 'Poster photo URL is required' });
  }

  if (!categoryId) {
    return res.status(400).json({ message: 'Category Id is required' });
  }

  if (!place) {
    return res.status(400).json({ message: 'Place is required' });
  }

  const existingPhoto = await Photo.findOne({ url: photoUrl }).exec();

  if (existingPhoto) {
    return res.status(400).json({ message: 'Photo already exists' });
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

  const category = await Category.findById(categoryId).exec();

  if (!category) {
    return res
      .status(400)
      .json({ message: 'Category does not exist in the database' });
  }

  const newPhoto = new Photo({
    name: photoName,
    url: photoUrl,
    publicId,
    place,
    categoryId,
    createdBy,
  });

  const createdPhoto = await newPhoto.save();

  if (createdPhoto) {
    return res.status(201).json({
      message: 'New Photo Uploaded Successfully',
      category: createdPhoto,
    });
  }
  return res.status(500).json({ message: 'Error in uploading photos' });
});

module.exports = createPhoto;
