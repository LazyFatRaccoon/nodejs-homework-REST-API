const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../../models");
const { httpError, sendEmail, htmlCodeForLetter } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email, { s: "250", r: "x", d: "wavatar" });
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }
  const verificationToken = uuidv4();
  const result = await User.create({
    email,
    avatarURL,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    verificationToken,
  });

  const path = "/api/users/verify";
  const html = htmlCodeForLetter({ verificationToken, path });

  const mail = {
    to: email,
    subject: "confirm your email",
    html,
  };
  await sendEmail(mail);

  res.status(201).json({
    user: {
      email,
      avatarURL,
      subscription: result.subscription,
      verificationToken,
    },
  });
};

module.exports = signup;
