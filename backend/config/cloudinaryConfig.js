const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploader = async function uploadToCloudinary(localFilePath) {
  const mainFolderName = 'gallery/';

  return cloudinary.uploader
    .upload(localFilePath, { folder: mainFolderName })
    .then((result) => {
      fs.unlinkSync(localFilePath);
      // console.log(result);
      return {
        message: 'Success',
        url: result.url,
        publicId: result.public_id,
      };
    })
    .catch((error) => {
      fs.unlinkSync(localFilePath);
      return { message: 'Fail' };
    });
};

module.exports = cloudinaryUploader;
