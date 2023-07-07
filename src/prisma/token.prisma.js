const prisma = require("../lib/prisma");

/**
 * @description Save token to the database
 * @param {string} token
 * @param {number} userId
 * @param {string} expiredAt
 * @returns {Promise}
 * @example
 * saveToken('dlsjld', 1, '2021-09-09')
 * **/

const saveToken = async (token, userId, expiredAt) => {
  // Check if user already has token then update new
  const response = await ifUserAlreadyhasToken(userId);

  try {
    if (response) {
      return await prisma.tokens.update({
        where: { id : response.id },
        data: {
          token,
          expiredAt,
        },
      });
    } else {
      return await prisma.tokens.create({
        data: {
          token,
          userId,
          expiredAt,
        },
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

const ifUserAlreadyhasToken = async (userId) => {
  try {
    return await prisma.tokens.findFirst({
      where: {
        userId,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { saveToken, ifUserAlreadyhasToken };
