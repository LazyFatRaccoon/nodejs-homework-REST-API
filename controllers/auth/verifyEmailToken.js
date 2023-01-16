const { User } = require("../../models/user");

const { httpError } = require("../../helpers");

const verifyEmailToken = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw httpError(404);
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.json({ message: "email verified successfully" });
};

module.exports = verifyEmailToken;
