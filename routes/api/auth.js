const express = require("express");
const multer = require("multer");

const { auth: ctrl } = require("../../controllers");

const { auth: tokenCheck, validation, ctrlWrapper } = require("../../helpers");
const { joiSchema } = require("../../models/user");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tmp");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.patch("/", tokenCheck, ctrlWrapper(ctrl.updateSubscription));
router.get("/logout", tokenCheck, ctrlWrapper(ctrl.logout));
router.get("/current", tokenCheck, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  tokenCheck,
  upload.single("avatar"),
  ctrlWrapper(ctrl.changeAvatar)
);

module.exports = router;
