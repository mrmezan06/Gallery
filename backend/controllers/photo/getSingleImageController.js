const asyncHandler = require('express-async-handler');
const Photo = require('../../models/photoModel');
const User = require('../../models/userModel');

const getSingleImage = asyncHandler(async (req, res) => {
  const photoId = req.params.id;
  const photo = await Photo.findById(photoId).lean();
  if (!photo) {
    return res.status(400).json({ message: 'No photo found' });
  }

  const photos = await Photo.find({ categoryId: photo.categoryId })
    .limit(50)
    .lean();
  if (!photos) {
    return res.status(400).json({ message: 'No photos found' });
  } else {
    // photo.relatedPhotos = photos;
    // first remove the photo from the related photos
    const relatedPhotos = photos.filter((p) => p._id.toString() !== photoId);
    // then add the photo to the first index of the related photos
    relatedPhotos.unshift(photo);
    // remove all the fields except the ones we need, url, _id
    const filteredRelatedPhotos = relatedPhotos.map((p) => {
      return {
        _id: p._id,
        original: p.url,
        thumbnail: p.url,
      };
    });
    photo.relatedPhotos = filteredRelatedPhotos;
  }
  return res.status(200).json({
    success: true,
    message: 'Photo fetched successfully',
    photo,
  });
});

module.exports = getSingleImage;
