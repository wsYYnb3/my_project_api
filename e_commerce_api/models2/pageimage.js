"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PageImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PageImage.belongsTo(models.Page);
      PageImage.belongsTo(models.Image);
    }
  }
  PageImage.init(
    {
      page_id: DataTypes.INTEGER,
      image_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PageImage",
    }
  );
  return PageImage;
};
