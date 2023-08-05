const asyncHandler = require('express-async-handler');
const Photo = require('../../models/photoModel');
const User = require('../../models/userModel');

const getAllPhoto = asyncHandler(async (req, res) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Photo.countDocuments({});

  const photos = await Photo.find({})
    .populate('categoryId', 'categoryName')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean();
  if (!photos) {
    return res.status(400).json({ message: 'No photos found' });
  }
  return res.status(200).json({
    success: true,
    message: 'All photos fetched successfully',
    photos,
    count,
    numberOfPages: Math.ceil(count / pageSize),
  });
});

const getAllPhotoByItsUser = asyncHandler(async (req, res) => {
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

  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Photo.countDocuments({ createdBy });

  const photos = await Photo.find({ createdBy })
    .populate('categoryId', 'categoryName')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean();
  if (!photos) {
    return res.status(400).json({ message: 'No photos found' });
  }
  return res.status(200).json({
    success: true,
    message: `All photos fetched successfully for user ${existingUser.username}`,
    photos,
    count,
    numberOfPages: Math.ceil(count / pageSize),
  });
});

const getAllPhotoByItsCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Photo.countDocuments({ categoryId });
  const photos = await Photo.find({ categoryId })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean();

  if (!photos) {
    return res.status(400).json({ message: 'No photos found' });
  }
  return res.status(200).json({
    success: true,
    message: `All photos fetched successfully`,
    photos,
    count,
    numberOfPages: Math.ceil(count / pageSize),
  });
});

module.exports = {
  getAllPhoto,
  getAllPhotoByItsUser,
  getAllPhotoByItsCategory,
};
