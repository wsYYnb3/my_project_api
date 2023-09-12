const initModels = require("../models/init-models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { getProductAssociations } = require("../helpers/helpers");

const sequelize = new Sequelize("EcommerceDB", "root", "asdf4321", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
  logging: console.log,
});

const models = initModels(sequelize);

const ProductController = {
  // Get all products
  getAll: async (req, res) => {
    try {
      // console.log("Getting all products...");
      const products = await models.product.findAll({
        include: getProductAssociations(models) /*[
          {
            model: models.product,
            as: "product",
            include: getProductAssociations(models),
          },
          {
            model: models.productpriceincurrency,
            as: "productpriceincurrencies",
          },
          { model: models.unitofmeasure, as: "unit_of_measure" },
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
          { model: models.productspecification, as: "productspecifications" },
          { model: models.vendor, as: "vendor" },
          { model: models.keyword, as: "keyword_id_keywords" },
          { model: models.technicalinformation, as: "technicalinformations" },
          { model: models.category, as: "category" },
        ],,*/,
      });
      //console.log("Products found:", products);
      res.status(200).json(products);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific product by ID
  getById: async (req, res) => {
    try {
      const product = await models.product.findByPk(req.params.id, {
        include: getProductAssociations(models),
      });
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new product
  create: async (req, res) => {
    try {
      const product = await models.product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a product
  update: async (req, res) => {
    try {
      const product = await models.product.findByPk(req.params.id);
      if (product) {
        await product.update(req.body);
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a product
  delete: async (req, res) => {
    try {
      const product = await models.product.findByPk(req.params.id);
      if (product) {
        await product.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  search: async (req, res) => {
    //Categories search to be added
    try {
      const query = req.query.q;
      const languageCode = req.query.lang || "en";

      if (!query) {
        return res.status(400).json({ error: "No search query provided" });
      }

      const language = await models.language.findOne({
        where: { language_code: languageCode },
      });

      if (!language) {
        return res.status(404).json({ error: "Language not found" });
      }

      const queryTerms = query.split(" ").map((term) => `%${term}%`);

      const allConditions = await Promise.all(
        queryTerms.map(async (term) => {
          const matchingKeywords = await models.keyword.findAll({
            attributes: ["id"],
            include: [
              {
                model: models.translation,
                as: "keyword_key_translation",
                where: {
                  language_id: language.id,
                  translation_text: { [Op.like]: term },
                },
                attributes: [],
              },
            ],
          });

          const keywordIds = matchingKeywords.map((kw) => kw.id);

          return {
            [Op.or]: [
              Sequelize.where(
                Sequelize.col("name_key_translation.translation_text"),
                { [Op.like]: term }
              ),
              Sequelize.where(
                Sequelize.col("description_key_translation.translation_text"),
                { [Op.like]: term }
              ),
              Sequelize.where(
                Sequelize.col("slug_key_translation.translation_text"),
                { [Op.like]: term }
              ),
              { "$productkeywords.keyword_id$": { [Op.in]: keywordIds } },
            ],
          };
        })
      );

      const products = await models.product.findAll({
        include: [
          ...getProductAssociations(models),
          {
            model: models.translation,
            as: "name_key_translation",
            where: {
              language_id: language.id,
            },
            required: false,
            duplicating: false,
          },
          {
            model: models.translation,
            as: "description_key_translation",
            where: {
              language_id: language.id,
            },
            required: false,
            duplicating: false,
          },
          {
            model: models.translation,
            as: "slug_key_translation",
            where: {
              language_id: language.id,
            },
            required: false,
            duplicating: false,
          },
          {
            model: models.productkeyword,
            as: "productkeywords",
            required: false,
            duplicating: false,
          },
        ],
        where: {
          [Op.and]: allConditions,
        },
      });

      if (products.length > 0) {
        res.status(200).json(products);
      } else {
        res.status(404).json({ error: "No products found" });
      }
    } catch (error) {
      console.error("Error in search:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ProductController;
