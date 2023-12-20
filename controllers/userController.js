const initModels = require("../models/init-models");

const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../helpers/helpers");

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
  getByClerkId: async (req, res) => {
    try {
      const customer = await models.customer.findOne({
        where: { user_id: req.params.customerId },
        include: [
          {
            model: models.address,
            as: "billing_address",
          },
          { model: models.address, as: "shipping_address" },
          { model: models.cartitem, as: "cartitems" },
          { model: models.wishlistitem, as: "wishlistitems" },
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
  create: async (req, res) => {
    try {
      const customer = await models.customer.create(req.body);
      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

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
      const { id, email_addresses } = evt.data;
      const email = email_addresses[0]?.email_address;
      const type = "clerk";
      const existingCustomer = await models.customer.findOne({
        where: {
          user_id: id,
        },
      });
      if (existingCustomer) {
        console.log(`User ${id} already exists in the database.`);
      } else {
        await models.customer.create({
          user_id: id,
          email,
          type,
        });

        console.log(`User ${id} was successfully stored.`);
      }
    } catch (error) {
      console.error("Error in storeWebhookUserData:", error);
    }
  },

  setUserCookie: (res, userId) => {
    const cookieId = userId || uuidv4();
    res.cookie("userCookieId", cookieId, { maxAge: 900000, httpOnly: true });
  },
};

module.exports = UserController;
