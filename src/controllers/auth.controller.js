const TokenService = require("../services/token.service");
const { userServices } = require("../services/user.service");

const register = async (req, res) => {
  const { name, phone, password } = req.body;
  const user = await userServices.register({ name, phone, password });
  const token = await TokenService.generateAuthToken(user);

  res.json({ user, token });
};

const login = async (req, res) => {
  const { phone, password } = req.body;

  const user = await userServices.login(phone, password);
  const token = await TokenService.generateAuthToken(user);

  res.json({user, token});
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  const existingToken = await TokenService.verifyToken(refreshToken);
  
  const token = await TokenService.generateAuthToken(existingToken);

  res.json({token});
  
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  await TokenService.removeToken(refreshToken);
  res.json({ message: "Logout successfully" });
}

module.exports = { register, login, refreshToken, logout };
