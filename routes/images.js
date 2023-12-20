const express = require("express");
const router = express.Router();
const ImagesController = require("../controllers/imagesController");
const multer = require("multer");
const path = require("path");
const initModels = require("../models/init-models");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
  }
);

const models = initModels(sequelize);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({ storage: storage });
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const {
      originalname: file_name,
      mimetype: file_type,
      size: file_size,
      path: file_path,
    } = req.file;

    const image = await models.image.create({
      file_name,
      file_type,
      file_size,
      file_path,
    });

    res.status(200).send(image);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/images/:id", async (req, res) => {
  try {
    console.log("PARAMS", req.params);

    const image = await models.image.findByPk(req.params.id);

    console.log("image", image);
    if (image) {
      console.log("CONSOLE LOG", image.file_path);
      res.redirect(image.file_path);
    } else {
      res.status(404).send("Image not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
