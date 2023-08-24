"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsTo(models.Currency);
      Customer.belongsTo(models.Address, { as: "ShippingAddress" });
      Customer.belongsTo(models.Address, { as: "BillingAddress" });
      Customer.hasMany(models.Order);
      Customer.hasMany(models.UserActivity);
      Customer.hasMany(models.Session);
      Customer.hasMany(models.Ticket);
      Customer.hasMany(models.WishlistItem);
      Customer.hasMany(models.CartItem);
    }
  }
  Customer.init(
    {
      type: DataTypes.STRING,
      salt: DataTypes.STRING,
      username: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      email: DataTypes.STRING,
      location: DataTypes.STRING,
      phone: DataTypes.STRING,
      dob: DataTypes.DATE,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
      currency_id: DataTypes.INTEGER,
      shipping_address_id: DataTypes.INTEGER,
      billing_address_id: DataTypes.INTEGER,
      tax_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
