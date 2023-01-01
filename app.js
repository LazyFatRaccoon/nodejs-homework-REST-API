const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const usersRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const avatarsDir = path.join(__dirname, "public", "avatars");
console.log(avatarsDir);
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: multerConfig,
});

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);
app.post("/avatars", upload.single("image"), async (req, res) => {
  console.log(req.file);
});

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({
    status: status,
    message: err.message,
  });
});

module.exports = app;
