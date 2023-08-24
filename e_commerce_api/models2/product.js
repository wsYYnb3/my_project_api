"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category);
      Product.belongsTo(models.UnitOfMeasure);
      Product.belongsTo(models.Vendor);
      Product.belongsTo(models.Translation, { as: "Keyword" });
      Product.hasOne(models.ProductStats);
      Product.hasMany(models.ProductPriceInCurrency);
      Product.hasMany(models.WishlistItem);
      Product.hasMany(models.CartItem);
      Product.belongsToMany(models.Keyword, {
        through: ProductKeyword,
        foreignKey: "keyword_id",
      });
    }
  }
  Product.init(
    {
      name_key: DataTypes.STRING,
      slug_key: DataTypes.STRING,
      origin_key: DataTypes.STRING,
      description_key: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
      category_id: DataTypes.INTEGER,
      unit_of_measure_id: DataTypes.INTEGER,
      vendor_id: DataTypes.INTEGER,
      keyword_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
