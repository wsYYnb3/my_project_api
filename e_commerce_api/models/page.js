const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('page', {
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
    }
  }, {
    sequelize,
    tableName: 'page',
    timestamps: false,
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
    ]
  });
};
