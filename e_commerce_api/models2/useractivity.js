"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserActivity.belongsTo(models.Customer);
      UserActivity.belongsTo(models.Page);
      UserActivity.belongsTo(models.Session);
    }
  }
  UserActivity.init(
    {
      customer_id: DataTypes.INTEGER,
      page_id: DataTypes.INTEGER,
      session_id: DataTypes.INTEGER,
      timestamp: DataTypes.DATE,
      time_spent_on_page: DataTypes.INTEGER,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserActivity",
    }
  );
  return UserActivity;
};
