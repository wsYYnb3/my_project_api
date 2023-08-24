"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductKeyword extends Model {
    static associate(models) {
      // associations can be defined here
      ProductKeyword.belongsTo(models.Product, { foreignKey: "product_id" });
      ProductKeyword.belongsTo(models.Keyword, { foreignKey: "keyword_id" });
    }
  }
  ProductKeyword.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Product",
          key: "id",
        },
      },
      keyword_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Keyword",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "ProductKeyword",
    }
  );
  return ProductKeyword;
};
