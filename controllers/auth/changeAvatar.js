const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const { httpError } = require("../../helpers");

console.log("dirName changeAvatar: ", __dirname);

const changeAvatar = async (req, res) => {
  console.log(req);

  const { path: tempUpload, originalname } = req.file;

  const { _id } = req.user;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join("public", "avatars", fileName);
  try {
    await fs.rename(tempUpload, resultUpload);
    Jimp.read(resultUpload, (err, lenna) => {
      if (err) throw err;
      lenna.resize(250, 250).write(resultUpload);
    });
    const result = await User.findByIdAndUpdate(
      _id,
      { avatarURL: resultUpload },
      {
        new: true,
      }
    );
    if (!result) {
      throw httpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};

module.exports = changeAvatar;
