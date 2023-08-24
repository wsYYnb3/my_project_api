const Sequelize = require("sequelize");
const initModels = require("../models/init-models");

const sequelize = new Sequelize("EcommerceDB", "root", "asdf4321", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});

const models = initModels(sequelize);

/**
 * ProductPriceInCurrencyController
 * This controller provides CRUD operations for product prices in various currencies.
 */
const ProductPriceInCurrencyController = {
  /**
   * Retrieve all product prices in different currencies
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getAll: async (req, res) => {
    try {
      const prices = await models.productpriceincurrency.findAll();
      res.status(200).json(prices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Retrieve a specific product price by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getById: async (req, res) => {
    try {
      const price = await models.productpriceincurrency.findByPk(req.params.id);
      if (price) {
        res.status(200).json(price);
      } else {
        res.status(404).json({ error: "Price not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Create a new product price in a specific currency
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  create: async (req, res) => {
    try {
      const price = await models.productpriceincurrency.create(req.body);
      res.status(201).json(price);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Update an existing product price
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  update: async (req, res) => {
    try {
      const price = await models.productpriceincurrency.findByPk(req.params.id);
      if (price) {
        await price.update(req.body);
        res.status(200).json(price);
      } else {
        res.status(404).json({ error: "Price not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Delete a specific product price by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  delete: async (req, res) => {
    try {
      const price = await models.productpriceincurrency.findByPk(req.params.id);
      if (price) {
        await price.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Price not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Retrieve prices for a specific product
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getByProductId: async (req, res) => {
    try {
      const productId = req.params.product_id;
      const prices = await models.productpriceincurrency.findAll({
        where: { product_id: productId },
      });

      if (prices.length > 0) {
        res.status(200).json(prices);
      } else {
        res
          .status(404)
          .json({ error: "Prices not found for the specified product" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ProductPriceInCurrencyController;
