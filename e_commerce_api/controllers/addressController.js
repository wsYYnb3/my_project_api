const initModels = require("../models/init-models");
const Sequelize = require("sequelize");
const { getProductAssociations } = require("../helpers/helpers");
const CartController = require("./cartController");
const sequelize = new Sequelize("EcommerceDB", "root", "asdf4321", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});
const models = initModels(sequelize);

const AddressController = {
  getAllAddress: async (req, res) => {
    try {
      const { customerId } = req.params;
      if (!customerId) {
        console.log("empty");
        return;
      }
      const customer = await models.customer.findOne({
        where: { user_id: customerId },
      });
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      const billingAddresses = await models.orders.findAll({
        where: { customer_id: customer.id, DeletedAt: null },
        include: [
          {
            model: models.address,
            as: "billing_address",
          },
          {
            model: models.address,
            as: "shipping_address",
          },
        ],
      });
      if (billingAddresses) {
        res.status(200).json(billingAddresses);
      } else {
        res.status(404).json({ error: "Billing address not found" });
      }
    } catch (error) {
      console.error("Error in getBillingAddress", error);
      res.status(500).json({ error: error.message });
    }
  },
  getShippingAddress: async (req, res) => {
    try {
      const { customerId } = req.params;
      if (!customerId) {
        console.log("empty");
        return;
      }
      const customer = await models.customer.findOne({
        where: { user_id: customerId },
      });
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      const shippingAddresses = await models.orders.findAll({
        where: { customer_id: customer.id, DeletedAt: null },
        include: [
          {
            model: models.address,
            as: "shipping_address",
          },
        ],
      });
      if (shippingAddresses) {
        res.status(200).json(shippingAddresses);
      } else {
        res.status(404).json({ error: "Billing address not found" });
      }
    } catch (error) {
      console.error("Error in getBillingAddress", error);
      res.status(500).json({ error: error.message });
    }
  },
  getBillingAddress: async (req, res) => {
    try {
      const { customerId } = req.params;
      if (!customerId) {
        console.log("empty");
        return;
      }
      const customer = await models.customer.findOne({
        where: { user_id: customerId },
      });
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      const billingAddresses = await models.orders.findAll({
        where: { customer_id: customer.id, DeletedAt: null },
        include: [
          {
            model: models.address,
            as: "shipping_address",
          },
        ],
      });
      if (billingAddresses) {
        res.status(200).json(billingAddresses);
      } else {
        res.status(404).json({ error: "Billing address not found" });
      }
    } catch (error) {
      console.error("Error in getBillingAddress", error);
      res.status(500).json({ error: error.message });
    }
  },
};
