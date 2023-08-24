const initModels = require("../models/init-models");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("EcommerceDB", "root", "asdf4321", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});

const models = initModels(sequelize);

const ProductController = {
  // Get all products
  getAll: async (req, res) => {
    try {
      console.log("Getting all products...");
      const products = await models.product.findAll({
        include: [
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
          { model: models.productspecification, as: "productspecifications" },
          { model: models.vendor, as: "vendor" },
          { model: models.keyword, as: "keyword_id_keywords" },
        ],
      });
      console.log("Products found:", products);
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
        include: [
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
          { model: models.productspecification, as: "productspecifications" },
          { model: models.vendor, as: "vendor" },
          { model: models.keyword, as: "keyword_id_keywords" },
        ],
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
};

module.exports = ProductController;
