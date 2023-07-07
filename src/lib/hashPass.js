const bcrypt = require('bcrypt');

const hashPass = async (password) => {
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

const comparePass = async (password, hashed) => {
  const isMatch = await bcrypt.compare(password, hashed);
  return isMatch;
}

module.exports = { hashPass, comparePass };