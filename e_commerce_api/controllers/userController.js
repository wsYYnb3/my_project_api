const initModels = require("../models/init-models");
const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = new Sequelize("EcommerceDB", "root", "asdf4321", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});
const { Op } = require("sequelize");

const models = initModels(sequelize);
const UserController = {
  getAll: async (req, res) => {
    try {
      console.log("Getting all customers...");
      const customers = await models.customer.findAll({
        include: [
          {
            model: models.address,
            as: "billing_address",
          },
          { model: models.address, as: "shipping_address" },
          { model: models.cartitem, as: "cartitems" },
          { model: models.wishlistitem, as: "wishlistitems" },
          { model: models.orders, as: "orders" },
        ],
      });
      console.log("Customers found:", customers);
      res.status(200).json(customers);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get a customer by ID
  getById: async (req, res) => {
    try {
      const customer = await models.customer.findByPk(req.params.id, {
        include: [
          {
            model: models.address,
            as: "billing_address",
          },
          { model: models.address, as: "shipping_address" },
          { model: models.cartitem, as: "cartitems" },
          { model: models.wishlistitem, as: "wishlistitems" },
          { model: models.orders, as: "orders" },
        ],
      });
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new customer
  create: async (req, res) => {
    try {
      const customer = await models.customer.create(req.body);
      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a customer
  update: async (req, res) => {
    try {
      const customer = await models.product.findByPk(req.params.id);
      if (customer) {
        await customer.update(req.body);
        res.status(200).json(customer);
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a customer
  delete: async (req, res) => {
    try {
      const customer = await models.product.findByPk(req.params.id);
      if (customer) {
        await customer.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  storeWebhookUserData: async (evt) => {
    try {
      const { user_id, email_addresses } = evt.data;
      const email = email_addresses[0]?.email_address;
      const type = "clerk";
      const existingCustomer = await models.customer.findOne({
        where: {
          user_id: user_id,
        },
      });
      if (existingCustomer) {
        console.log(`User ${user_id} already exists in the database.`);
      } else {
        await models.customer.create({
          user_id,
          email,
          type,
        });

        console.log(`User ${user_id} was successfully stored.`);
      }
    } catch (error) {
      console.error("Error in storeWebhookUserData:", error);
    }
  },

  // Set user-specific cookies
  setUserCookie: (res, userId) => {
    const cookieId = userId || uuidv4();
    res.cookie("userCookieId", cookieId, { maxAge: 900000, httpOnly: true });
  },

  logCartAction: async (req, res) => {
    try {
      const user_id = req.cookies.userCookieId;
      const { product_id, quantity } = req.body;

      await models.cartitem.upsert(
        {
          user_id,
          product_id,
          quantity,
        },
        { fields: ["user_id", "product_id"] }
      );

      res.status(200).json({ message: "Cart updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  logWishListAction: async (req, res) => {
    try {
      const customer_id = req.cookies.userCookieId;
      const { product_id } = req.body;

      await models.wishlistitem.upsert(
        {
          customer_id,
          product_id,
        },
        { fields: ["customer_id", "product_id"] }
      );

      res.status(200).json({ message: "Wishlist updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = UserController;
