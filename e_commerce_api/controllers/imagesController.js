const multer = require("multer");
const path = require("path");
const initModels = require("../models/init-models");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("EcommerceDB", "root", "asdf4321", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});

const models = initModels(sequelize);

const upload = multer({ dest: "uploads/" });

class ImagesController {
  static async upload(req, res) {
    try {
      console.log(req.file);
      const {
        originalname: file_name,
        mimetype: file_type,
        size: file_size,
        path: file_path,
      } = req.file;

      const imageRecord = await models.image.create({
        file_name,
        file_type,
        file_size,
        file_path,
      });

      res.status(200).send(imageRecord);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  static async getImageById(req, res) {
    try {
      const imageRecord = await models.image.findByPk(req.params.id);
      if (imageRecord) {
        res.sendFile(path.resolve(imageRecord.file_path));
      } else {
        res.status(404).send("Image not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = ImagesController;
