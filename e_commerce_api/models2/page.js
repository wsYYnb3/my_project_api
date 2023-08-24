"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Page.belongsTo(models.Translation, { as: "NameKey" });
      Page.belongsTo(models.Translation, { as: "SlugKey" });
      Page.hasMany(models.UserActivity);
      Page.hasMany(models.PageContent);
    }
  }
  Page.init(
    {
      name_key: DataTypes.STRING,
      slug_key: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Page",
    }
  );
  return Page;
};
