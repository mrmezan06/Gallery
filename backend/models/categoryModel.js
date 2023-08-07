const mongoose = require('mongoose');

// Category Name, Poster Photo URL, Date Of Birth, Country, CreatedBy, UpdatedBy

const { Schema } = mongoose;

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
    categoryName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9 ]{3,30}$/.test(value);
        },
        message:
          'Category Name can only have Alphanumeric values. No special characters allowed',
      },
    },
    posterPhotoURL: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      default: '',
    },
    dateOfBirth: {
      type: String,
      required: true,
      default: '01/01/2000',
    },
    country: {
      type: String,
      required: true,
      default: 'USA',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
