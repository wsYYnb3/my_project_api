"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PageContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PageContent.belongsTo(models.Page);
      PageContent.belongsTo(models.Translation, { as: "ContentKey" });
    }
  }
  PageContent.init(
    {
      page_id: DataTypes.INTEGER,
      content_key: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PageContent",
    }
  );
  return PageContent;
};
