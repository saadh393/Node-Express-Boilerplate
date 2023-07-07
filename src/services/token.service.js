const jwt = require("jsonwebtoken");
const { saveToken, ifUserAlreadyhasToken, deleteToken } = require("../prisma/token.prisma");

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


const verifyToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const tokenDoc = await ifUserAlreadyhasToken(decoded.id);
    
    if (!tokenDoc) {
      throw new Error("Token not found");
    }

    if (tokenDoc.token !== refreshToken) {
      throw new Error("Token not found");
    }

    tokenDoc.id = tokenDoc.userId;
    return tokenDoc;
    
  } catch (error) {
    throw new Error(error);
  }
}


const removeToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const tokenDoc = await ifUserAlreadyhasToken(decoded.id);
    
    if (!tokenDoc) {
      throw new Error("Token not found");
    }

    if (tokenDoc.token !== refreshToken) {
      throw new Error("Token not found");
    }

    await deleteToken(tokenDoc.id)
    
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { generateAuthToken, verifyToken, removeToken };
