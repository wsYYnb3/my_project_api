'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnitOfMeasure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UnitOfMeasure.init({
    name: DataTypes.STRING,
    conversion_factor_to_base: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'UnitOfMeasure',
  });
  return UnitOfMeasure;
};