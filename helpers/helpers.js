const initModels = require("../models/init-models");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
    },
    logging: false,
  }
);
function getProductAssociations(models) {
  return [
    {
      model: models.productpriceincurrency,
      as: "productpriceincurrencies",
    },
    {
      model: models.unitofmeasure,
      as: "unit_of_measure",
    },
    {
      model: models.productimage,
      as: "productimages",
      include: [
        {
          model: models.image,
          as: "image",
        },
      ],
    },
    {
      model: models.productcartimage,
      as: "productcartimages",
      include: [
        {
          model: models.image,
          as: "image",
        },
      ],
    },
    {
      model: models.productcardimage,
      as: "productcardimages",
      include: [
        {
          model: models.image,
          as: "image",
        },
      ],
    },
    {
      model: models.productspecification,
      as: "productspecifications",
    },
    {
      model: models.vendor,
      as: "vendor",
    },
    {
      model: models.keyword,
      as: "keyword_id_keywords",
    },
    {
      model: models.technicalinformation,
      as: "technicalinformations",
    },
    {
      model: models.category,
      as: "category",
    },
  ];
}

module.exports = { getProductAssociations, sequelize };
