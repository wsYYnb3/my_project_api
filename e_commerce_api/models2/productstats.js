"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductStats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductStats.belongsTo(models.Product);
    }
  }
  ProductStats.init(
    {
      product_id: DataTypes.INTEGER,
      total_views: DataTypes.INTEGER,
      total_purchases: DataTypes.INTEGER,
      times_added_to_cart: DataTypes.INTEGER,
      times_added_to_wishlist: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductStats",
    }
  );
  return ProductStats;
};
