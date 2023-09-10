const initModels = require("../models/init-models");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("EcommerceDB", "root", "asdf4321", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});

const models = initModels(sequelize);

const CategoryController = {
  // Get all categories
  getAll: async (req, res) => {
    try {
      // console.log("Getting all categories...");
      const categories = await models.category.findAll({
        include: [
          /*  {
            model: models.product,
            as: "products",
          },*/
        ],
      });
      //console.log("Categories found:", categories);
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific category by ID
  getById: async (req, res) => {
    try {
      const category = await models.category.findByPk(req.params.id, {
        include: [
          /*{
            model: models.product,
            as: "products",
          },*/
        ],
      });
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ error: "Category not found" });
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

  // Update a category
  update: async (req, res) => {
    try {
      const category = await models.category.findByPk(req.params.id);
      if (category) {
        await category.update(req.body);
        res.status(200).json(category);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a category
  delete: async (req, res) => {
    try {
      const category = await models.category.findByPk(req.params.id);
      if (category) {
        await category.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = CategoryController;
