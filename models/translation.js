const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('translation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    translation_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'language',
        key: 'id'
      }
    },
    translation_text: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'translation',
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
        name: "translation_key",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "translation_key" },
          { name: "language_id" },
        ]
      },
      {
        name: "language_id",
        using: "BTREE",
        fields: [
          { name: "language_id" },
        ]
      },
    ]
  });
};
