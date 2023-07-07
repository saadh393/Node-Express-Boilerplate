const jwt = require("jsonwebtoken");
const { saveToken } = require("../prisma/token.prisma");

const generateAuthToken = async (user) => {
  var currentTime = new Date().getTime();

  var REFRESH_EXPIRE = new Date(currentTime + process.env.REFRESH_EXPIRE * 24 * 60 * 60 * 1000).getTime();
  var ACCESS_TOKEN_EXPIRE = new Date(currentTime + process.env.TOKEN_EXPIRE * 60 * 1000).getTime();

  const accessToken = jwt.sign({ id: user.id, type: "ACCESS_TOKEN" }, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRE });
  const refreshToken = jwt.sign({ id: user.id, type: "Refresh_TOKEN" }, process.env.JWT_SECRET, { expiresIn: REFRESH_EXPIRE });

  // Saving Refresh token to the Database
  await saveToken(refreshToken, user.id, ACCESS_TOKEN_EXPIRE);

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = { generateAuthToken };
