const { hashPass } = require("../lib/hashPass");
const prisma = require("../lib/prisma");

/**
 * @description Check if user exists
 * @param {string} phone
 * @returns {Promise}
 * @example
 * isUserExists('dlsjld')
 * **/
const isUserExists = async (phone) => {
  return await prisma.users.findUnique({
    where: {
      phone: phone,
    },
  });
};

/**
 * @description Create user
 * @param {object} data
 * @returns {Promise}
 * @example
 * createUser({name: 'dlsjld', phone: 'dlsjld', password: 'dlsjld'})
 * **/
const createUser = async (data) => {
  const password = await hashPass(data.password);

  return await prisma.users.create({
    data: {
      ...data,
      password: password,
    },
  });
};

module.exports = { createUser, isUserExists };
