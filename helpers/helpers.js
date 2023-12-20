const initModels = require("../models/init-models");

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

module.exports = { getProductAssociations };
