const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productkeyword', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    keyword_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'keyword',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'productkeyword',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
          { name: "keyword_id" },
        ]
      },
      {
        name: "keyword_id",
        using: "BTREE",
        fields: [
          { name: "keyword_id" },
        ]
      },
    ]
  });
};
