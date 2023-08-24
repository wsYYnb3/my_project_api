"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TechnicalInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TechnicalInformation.belongsTo(models.Product);
      TechnicalInformation.belongsTo(models.Translation, { as: "InfoKey" });
    }
  }
  TechnicalInformation.init(
    {
      product_id: DataTypes.INTEGER,
      info_key: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TechnicalInformation",
    }
  );
  return TechnicalInformation;
};
