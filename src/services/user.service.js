const { comparePass } = require("../lib/hashPass");
const usersQuery = require("../prisma/users.prisma");

const register = async (data) => {
  const isExist = await usersQuery.isUserExists(data.phone);

  if (isExist) {
    throw new Error("User already exists");
  }

  const user = await usersQuery.createUser(data);

  // Remove password from user Response
  delete user.password;

  return user;
};

const login = async (phone, password) => {
  const user = await usersQuery.isUserExists(phone);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await comparePass(password, user.password);

  if (!isMatch) {
    throw new Error("Password is incorrect");
  }

  // Remove password from user Response
  delete user.password;
  return user;
};

module.exports.userServices = { register, login };
