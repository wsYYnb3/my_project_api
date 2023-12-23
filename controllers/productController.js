const initModels = require("../models/init-models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { getProductAssociations } = require("../helpers/helpers");
const { sequelize } = require("../helpers/helpers");

const models = initModels(sequelize);

const ProductController = {
  getAll: async (req, res) => {
    try {
      const products = await models.product.findAll({
        include: getProductAssociations(models),
      });

      res.status(200).json(products);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ error: error.message });
    }
  },

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

  create: async (req, res) => {
    try {
      const product = await models.product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

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
      if (query.trim().length < 3) {
        return res
          .status(400)
          .json({ error: "Minimum 3 characters length for search query" });
      }
      const queryTerms = query.split(" ").map((term) => `\\b${term}\\b`);

      const allConditions = await Promise.all(
        queryTerms.map(async (term) => {
          const matchingCategories = await models.category.findAll({
            attributes: ["id"],
            include: [
              {
                model: models.translation,
                as: "name_key_translation",
                where: {
                  language_id: language.id,
                  translation_text: { [Op.regexp]: term },
                },
                attributes: [],
              },
            ],
          });
          const matchingKeywords = await models.keyword.findAll({
            attributes: ["id"],
            include: [
              {
                model: models.translation,
                as: "keyword_key_translation",
                where: {
                  language_id: language.id,
                  translation_text: { [Op.regexp]: term },
                },
                attributes: [],
              },
            ],
          });

          const keywordIds = matchingKeywords.map((kw) => kw.id);
          const categoryIds = matchingCategories.map((cat) => cat.id);
          return {
            [Op.or]: [
              Sequelize.where(
                Sequelize.col("name_key_translation.translation_text"),
                { [Op.regexp]: term }
              ),

              Sequelize.where(
                Sequelize.col("description_key_translation.translation_text"),
                { [Op.regexp]: term }
              ),
              Sequelize.where(
                Sequelize.col("slug_key_translation.translation_text"),
                { [Op.regexp]: term }
              ),
              { category_id: { [Op.in]: categoryIds } },
              { "$productkeywords.keyword_id$": { [Op.in]: keywordIds } },
            ],
          };
        })
      );
      console.log(allConditions);
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
