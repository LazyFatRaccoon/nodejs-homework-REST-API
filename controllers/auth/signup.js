const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../models");
const { httpError } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email, { s: "250", r: "x", d: "wavatar" });
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }
  const result = await User.create({
    email,
    avatarURL,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  });
  res.status(201).json({
    user: {
      email,
      avatarURL,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;
