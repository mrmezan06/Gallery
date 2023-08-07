const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const { USER } = require('../constants/index');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[A-z][A-z0-9-_]{3,23}$/.test(value);
        },
        message:
          'username must be alphanumeric,without special characters.Hyphens and underscores allowed',
      },
    },

    name: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z ]{3,30}$/.test(value);
        },
        message:
          'Name can only have Alphanumeric values. No special characters allowed',
      },
    },
    password: {
      type: String,
      select: false,
      // validate: validator.isStrongPassword,
      validate: [
        validator.isStrongPassword,
        'Password must be at least 8 characters long, with at least 1 uppercase and lowercase letters and at least 1 symbol',
      ],
    },
    isEmailVerified: { type: Boolean, required: true, default: false },
    provider: {
      type: String,
      required: true,
      default: 'email',
    },
    city: String,
    googleID: String,

    avatar: String,
    publicId: String,
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    passwordChangedAt: Date,

    roles: {
      type: [String],
      default: [USER],
    },
    active: {
      type: Boolean,
      default: true,
    },
    refreshToken: [String],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.roles.length === 0) {
    this.roles.push(USER);
    next();
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now();
  next();
});

userSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
