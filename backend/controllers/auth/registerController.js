const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const Token = require('../../models/tokenModel');
const sendEmail = require('../../utils/sendEmail');

const randomBytes = require('crypto').randomBytes;

const ClientURL = process.env.CLIENT_DOMAIN;

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, name, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('An email address is required');
  }

  if (!username) {
    res.status(400);
    throw new Error('A username is required');
  }
  if (!name) {
    res.status(400);
    throw new Error('You must enter your full name');
  }

  if (!password) {
    res.status(400);
    throw new Error('You must enter a password');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(
      "The email address you've entered is already associated with another account"
    );
  }

  const newUser = new User({
    email,
    username,
    name,
    password,
  });

  const registeredUser = await newUser.save();

  if (!registeredUser) {
    res.status(400);
    throw new Error('User could not be registered');
  }

  if (registeredUser) {
    const verificationToken = randomBytes(4).toString('hex');

    let emailVerificationToken = await new Token({
      _userId: registeredUser._id,
      token: verificationToken.toUpperCase(),
    }).save();

    const emailLink = `${ClientURL}/verify/${registeredUser._id}`;

    const payload = {
      name: registeredUser.name,
      link: emailLink,
      token: emailVerificationToken.token,
    };

    await sendEmail(
      registeredUser.email,
      'Account Verification',
      payload,
      './templates/accountVerification.handlebars'
    );

    res.status(201).json({
      _id: registeredUser._id,
    });
  }
});

module.exports = registerUser;
