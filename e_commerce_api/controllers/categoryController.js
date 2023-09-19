const initModels = require("../models/init-models");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("EcommerceDB", "root", "asdf4321", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});

const models = initModels(sequelize);

const CategoryController = {
  getAll: async (req, res) => {
    try {
      const categories = await models.category.findAll({
        include: [
          /*  {
            model: models.product,
            as: "products",
          },*/
        ],
        where: { parent_id: !null },
      });
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ error: error.message });
    }
  },

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
