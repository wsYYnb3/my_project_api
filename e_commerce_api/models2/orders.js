"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Customer);
      Order.belongsTo(models.Address, { as: "ShippingAddress" });
      Order.belongsTo(models.Currency);
    }
  }
  Orders.init(
    {
      customer_id: DataTypes.INTEGER,
      shipping_address_id: DataTypes.INTEGER,
      total: DataTypes.DECIMAL,
      status: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
      currency_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
