const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_key: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'translation',
        key: 'translation_key'
      }
    },
    slug_key: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'translation',
        key: 'translation_key'
      }
    },
    origin_key: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'translation',
        key: 'translation_key'
      }
    },
    description_key: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'translation',
        key: 'translation_key'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    unit_of_measure_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'unitofmeasure',
        key: 'id'
      }
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'vendor',
        key: 'id'
      }
    },
    keyword_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'keyword',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product',
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
        name: "category_id",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "unit_of_measure_id",
        using: "BTREE",
        fields: [
          { name: "unit_of_measure_id" },
        ]
      },
      {
        name: "vendor_id",
        using: "BTREE",
        fields: [
          { name: "vendor_id" },
        ]
      },
      {
        name: "keyword_id",
        using: "BTREE",
        fields: [
          { name: "keyword_id" },
        ]
      },
      {
        name: "name_key",
        using: "BTREE",
        fields: [
          { name: "name_key" },
        ]
      },
      {
        name: "slug_key",
        using: "BTREE",
        fields: [
          { name: "slug_key" },
        ]
      },
      {
        name: "origin_key",
        using: "BTREE",
        fields: [
          { name: "origin_key" },
        ]
      },
      {
        name: "description_key",
        using: "BTREE",
        fields: [
          { name: "description_key" },
        ]
      },
    ]
  });
};
