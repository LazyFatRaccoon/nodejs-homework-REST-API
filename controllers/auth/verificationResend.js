const { User } = require("../../models/user");

const { httpError, htmlCodeForLetter, sendEmail } = require("../../helpers");

const verificationResend = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    throw httpError(404);
  }
  if (user.verify) {
    throw httpError(400, "Verification has already been passed");
  }
  const path = "/api/users/verify";
  const html = htmlCodeForLetter({
    verificationToken: user.verificationToken,
    path,
  });

  const mail = {
    to: user.email,
    subject: "confirm your email",
    html,
  };
  await sendEmail(mail);

  res.json({ message: "email was successfully send" });
};

module.exports = verificationResend;
