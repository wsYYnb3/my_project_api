"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Translation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Translation.belongsTo(models.Language);
      Translation.hasMany(models.Keyword, { as: "KeywordKey" });
      Translation.hasMany(models.Page, { as: "NameKey" });
      Translation.hasMany(models.Page, { as: "SlugKey" });
      Translation.hasMany(models.PageContent, { as: "ContentKey" });
      Translation.hasMany(models.ProductSpecification, { as: "ContentKey" });
      Translation.hasMany(models.TechnicalInformation, { as: "InfoKey" });
      Translation.hasMany(models.Product, { as: "NameKey" });
      Translation.hasMany(models.Product, { as: "SlugKey" });
      Translation.hasMany(models.Product, { as: "OriginKey" });
      Translation.hasMany(models.Product, { as: "DescriptionKey" });
      Translation.hasMany(models.Category, { as: "NameKey" });
      Translation.hasMany(models.Category, { as: "SlugKey" });
    }
  }
  Translation.init(
    {
      translation_key: DataTypes.STRING,
      language_id: DataTypes.INTEGER,
      translation_text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Translation",
    }
  );
  return Translation;
};
