"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductSpecification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductSpecification.belongsTo(models.Product);
      ProductSpecification.belongsTo(models.Translation, { as: "ContentKey" });
    }
  }
  ProductSpecification.init(
    {
      product_id: DataTypes.INTEGER,
      content_key: DataTypes.STRING,
      variety: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductSpecification",
    }
  );
  return ProductSpecification;
};
