'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Image.init({
    file_path: DataTypes.STRING,
    file_name: DataTypes.STRING,
    file_size: DataTypes.INTEGER,
    file_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};