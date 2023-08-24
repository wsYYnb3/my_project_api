"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Currency.hasMany(models.Customer);
      Currency.hasMany(models.Order);
      Currency.hasMany(models.ProductPriceInCurrency);
    }
  }
  Currency.init(
    {
      currency_code: DataTypes.STRING,
      currency_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Currency",
    }
  );
  return Currency;
};
