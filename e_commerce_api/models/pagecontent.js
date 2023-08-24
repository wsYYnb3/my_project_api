const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pagecontent', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    page_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'page',
        key: 'id'
      }
    },
    content_key: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'translation',
        key: 'translation_key'
      }
    }
  }, {
    sequelize,
    tableName: 'pagecontent',
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
        name: "page_id",
        using: "BTREE",
        fields: [
          { name: "page_id" },
        ]
      },
      {
        name: "content_key",
        using: "BTREE",
        fields: [
          { name: "content_key" },
        ]
      },
    ]
  });
};
