const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const changeAvatar = require("./changeAvatar");
const verifyEmailToken = require("./verifyEmailToken");
const verificationResend = require("./verificationResend");

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  updateSubscription,
  changeAvatar,
  verifyEmailToken,
  verificationResend,
};
