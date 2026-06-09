const jwt = require("jsonwebtoken");

function generateTokens(user) {
  const accessToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    accessToken,
    refreshToken,
  };
}

module.exports = generateTokens;