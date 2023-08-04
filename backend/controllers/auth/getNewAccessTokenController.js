const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

const getNewAccessToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res
      .status(401)
      .json({ message: 'You are not authorized to access this route' });
  }

  const refreshToken = cookies.jwt;

  const options = {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // would expire after 1 days
    secure: true,
    sameSite: 'None',
  };

  res.clearCookie('jwt', options);

  const existingUser = await User.findOne({ refreshToken }).exec();
  if (!existingUser) {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY,
      async (err, decode) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid refresh token' });
        }
        const hackedUser = await User.findById(decode.id).exec();
        hackedUser.refreshToken = [];
        await hackedUser.save();
        return res
          .status(403)
          .json({ message: 'Malicious activity detected. Please login again' });
      }
    );
  }

  const newRefreshTokenArray = existingUser.refreshToken.filter(
    (token) => token !== refreshToken
  );
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET_KEY,
    async (err, decode) => {
      if (err) {
        existingUser.refreshToken = [...newRefreshTokenArray];
        await existingUser.save();
      }

      if (err || existingUser._id.toString() !== decode.id) {
        return res.status(403).send({ message: 'Invalid refresh token' });
      }

      const accessToken = jwt.sign(
        { id: existingUser._id, roles: existingUser.roles },
        process.env.JWT_ACCESS_SECRET_KEY,
        {
          expiresIn: '1d',
        }
      );

      const newRefreshToken = jwt.sign(
        {
          id: existingUser._id,
        },
        process.env.JWT_REFRESH_SECRET_KEY,
        { expiresIn: '7d' }
      );

      existingUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];

      await existingUser.save();

      const options = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: true,
        sameSite: 'None',
      };

      res.cookie('jwt', newRefreshToken, options);

      res.status(200).json({
        success: true,
        id: existingUser._id,
        name: existingUser.name,
        username: existingUser.username,
        provider: existingUser.provider,
        avatar: existingUser.avatar,
        accessToken,
      });
    }
  );
});

module.exports = getNewAccessToken;
