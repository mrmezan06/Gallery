const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const Token = require('../../models/tokenModel');
const sendEmail = require('../../utils/sendEmail');

// TODO: Add a frontend route for this
const ClientURL = process.env.CLIENT_DOMAIN;

const verifyUserEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId });

  if (!user) {
    return res
      .status(400)
      .json({ message: 'We were unable to find a user for this token' });
  }
  if (user.isEmailVerified) {
    return res
      .status(400)
      .json({ message: 'This user has already been verified' });
  }

  const userToken = await Token.findOne({
    _userId: user._id,
    token: req.body.token,
  });

  if (!userToken) {
    return res
      .status(400)
      .json({ message: 'Token invalid! Your token may have expired' });
  }

  user.isEmailVerified = true;
  await user.save();

  if (user.isEmailVerified) {
    const emailLink = `${ClientURL}/login`;

    const payload = {
      name: user.name,
      link: emailLink,
    };

    await sendEmail(
      user.email,
      'Welcome - Account Verified',
      payload,
      './templates/welcome.handlebars'
    );
    // res.redirect(`${ClientURL}/login`);
    // TODO: Redirect to login page
    res.status(200).json({
      success: true,
      message: `Your account has been successfully verified. You can login now.`,
    });
  }
});

module.exports = verifyUserEmail;
