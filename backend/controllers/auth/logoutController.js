const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');

const logoutUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204).json({ message: 'No cookies found' });
  }
  const refreshToken = cookies.jwt;

  const existingUser = await User.findOne({ refreshToken });
  if (!existingUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    return res.status(404).json({ message: 'No user found' });
  }

  existingUser.refreshToken = existingUser.refreshToken.filter(
    (token) => token !== refreshToken
  );
  await existingUser.save();

  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });

  res.status(200).json({ success: true, message: 'Logout successful' });
});

module.exports = logoutUser;
