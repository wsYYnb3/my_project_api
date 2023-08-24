"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Keyword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Keyword.belongsTo(models.Translation, { as: "KeywordKey" });
      Keyword.hasMany(models.KeywordStats);
      Keyword.belongsToMany(models.Product, {
        through: ProductKeyword,
        foreignKey: "keyword_id",
      });
    }
  }
  Keyword.init(
    {
      keyword_key: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Keyword",
    }
  );
  return Keyword;
};
