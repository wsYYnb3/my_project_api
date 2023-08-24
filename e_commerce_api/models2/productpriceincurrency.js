"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductPriceInCurrency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductPriceInCurrency.belongsTo(models.Product);
      ProductPriceInCurrency.belongsTo(models.Currency);
    }
  }
  ProductPriceInCurrency.init(
    {
      product_id: DataTypes.INTEGER,
      currency_id: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      discount_price: DataTypes.DECIMAL,
      sale_start_date: DataTypes.DATE,
      sale_end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProductPriceInCurrency",
    }
  );
  return ProductPriceInCurrency;
};
