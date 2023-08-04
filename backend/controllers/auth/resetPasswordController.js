const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const Token = require('../../models/tokenModel');
const sendEmail = require('../../utils/sendEmail');

const randomBytes = require('crypto').randomBytes;

const domainClient = process.env.CLIENT_DOMAIN;

const resetPassworRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ message: 'Please provide your email address' });
  }
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(404).json({
      message:
        'We are unable to find any user associated with this email address',
    });
  }

  let verificationToken = await Token.findOne({
    _userId: existingUser._id,
  });
  if (verificationToken) {
    await verificationToken.deleteOne();
  }
  const resetToken = randomBytes(4).toString('hex');
  let newVerificationToken = await new Token({
    _userId: existingUser._id,
    token: resetToken.toUpperCase(),
    createdAt: Date.now(),
  }).save();

  if (existingUser && existingUser.isEmailVerified) {
    const emailLink = `${domainClient}/auth/reset_password?userId=${existingUser._id}`;

    const payload = {
      name: existingUser.name,
      link: emailLink,
      token: newVerificationToken.token,
    };

    await sendEmail(
      existingUser.email,
      'Password reset request',
      payload,
      './templates/requestResetPassword.handlebars'
    );

    res.status(200).json({
      success: true,
      message: `A password reset email has been sent to ${email}.
              It will expire in 15 minutes. Please check your inbox
              and click on the link provided to your email address.`,
    });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, userId, token } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters long',
    });
  }

  const passwordResetToken = await Token.findOne({
    _userId: userId,
    token: token,
  });

  if (!passwordResetToken) {
    return res.status(400).json({
      message:
        'We were unable to find a valid token. Your token my have expired. Please request to reset your password again.',
    });
  }

  const user = await User.findById({
    _id: passwordResetToken._userId,
  });

  if (user && passwordResetToken) {
    user.password = password;
    await user.save();

    await passwordResetToken.deleteOne();

    const payload = {
      name: user.name,
    };

    await sendEmail(
      user.email,
      'Password Reset Completed',
      payload,
      './templates/resetPassword.handlebars'
    );

    res.json({
      success: true,
      message: `Hey ${user.name},Your password reset was successful. An email has been sent to confirm the reset.`,
    });
  }
});

module.exports = { resetPassworRequest, resetPassword };
