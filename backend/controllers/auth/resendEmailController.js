const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const Token = require('../../models/tokenModel');
const sendEmail = require('../../utils/sendEmail');

// TODO: Add a frontend route for this
const ClientURL = process.env.CLIENT_DOMAIN;
const randomBytes = require('crypto').randomBytes;

const resendEmailToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Please provide your email' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: `We are unable to find any user associated with ${email}`,
    });
  }
  if (user.isEmailVerified) {
    return res
      .status(400)
      .json({ message: 'Email already verified. You can login now.' });
  }
  let verificationToken = await Token.findOne({ _userId: user._id });
  if (verificationToken) {
    await verificationToken.deleteOne();
  }
  const resendToken = randomBytes(4).toString('hex');
  let emailToken = await new Token({
    _userId: user._id,
    token: resendToken.toUpperCase(),
  }).save();
  const emailLink = `${ClientURL}/verify/${user._id}`;

  const payload = {
    name: user.name,
    link: emailLink,
    token: emailToken.token,
  };

  await sendEmail(
    user.email,
    'Account Verification',
    payload,
    './templates/accountVerification.handlebars'
  );
  res.status(200).json({
    success: true,
    _id: user._id,
    message: `A verification email has been sent to ${email}.
       It will expire in 15 minutes. Please check your inbox
        and click on the link provided to your email address.Enter the verification code to verify your email address.`,
  });
});

module.exports = resendEmailToken;
