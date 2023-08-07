const mongoose = require('mongoose');

// Category Name, Model FullName, Poster Photo URL, Date Of Birth, Country, CreatedBy, UpdatedBy
const { Schema } = mongoose;

const PhotoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      /*  validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9-.,<>?:,_@#()&!+'"` ]{3,250}$/.test(value);
        },
        message:
          'Photo Name can only have Alphanumeric values. Some special characters allowed including @.()#&+-_"\'!,.:;?<>',
      }, */
    },
    categoryId: {
      type: String,
      required: true,
      ref: 'Category',
    },
    place: {
      type: String,
      required: true,
      default: 'Unknown',
    },
    url: {
      type: String,
      unique: true,
      required: true,
    },
    publicId: {
      type: String,
      default: '',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
