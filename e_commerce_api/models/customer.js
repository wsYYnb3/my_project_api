const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    shipping_address_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'address',
        key: 'id'
      }
    },
    billing_address_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'address',
        key: 'id'
      }
    },
    tax_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "unique_user_id"
    }
  }, {
    sequelize,
    tableName: 'customer',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "unique_user_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "shipping_address_id",
        using: "BTREE",
        fields: [
          { name: "shipping_address_id" },
        ]
      },
      {
        name: "billing_address_id",
        using: "BTREE",
        fields: [
          { name: "billing_address_id" },
        ]
      },
    ]
  });
};
