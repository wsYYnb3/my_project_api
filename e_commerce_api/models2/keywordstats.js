'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KeywordStats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KeywordStats.init({
    keyword_id: DataTypes.INTEGER,
    accesses: DataTypes.INTEGER,
    last_accessed: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'KeywordStats',
  });
  return KeywordStats;
};