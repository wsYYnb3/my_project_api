"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.Translation, { as: "NameKey" });
      Category.belongsTo(models.Translation, { as: "SlugKey" });
      Category.hasMany(models.Product);
    }
  }
  Category.init(
    {
      name_key: DataTypes.STRING,
      slug_key: DataTypes.STRING,
      parent_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
