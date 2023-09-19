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
const verifyAdminMW = require("../middlewares/admin/verifyAdminMW");
const { Op } = require("sequelize");

const OrdersController = {
  getAll: async (req, res) => {
    try {
      const orders = await models.orders.findAll({
        where: { DeletedAt: null },
        include: [
          { model: models.address, as: "shipping_address" },
          { model: models.address, as: "billing_address" },
          { model: models.customer, as: "customer" },
          {
            model: models.ordersitem,
            as: "ordersitems",
            include: [
              {
                model: models.product,
                as: "product",
                include: getProductAssociations(models),
              },
            ],
          },
        ],
      });
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error in getAllOrders:", error);
      res.status(500).json({ error: error.message });
    }
  },
  getAllOrdersID: async (req, res) => {
    try {
      const orders = await models.orders.findAll({
        where: { DeletedAt: null },
        attributes: ["id"],
      });
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error in getAllOrdersID:", error);
      res.status(500).json({ error: error.message });
    }
  },
  getAllByCustomerId: async (req, res) => {
    try {
      const { customerId } = req.params;
      const customer = await models.customer.findOne({
        where: { user_id: customerId },
      });
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      const orders = await models.orders.findAll({
        where: { customer_id: customer.id },
        include: [
          {
            model: models.ordersitem,
            as: "ordersitems",
            include: [
              {
                model: models.product,
                as: "product",
                include: getProductAssociations(models),
              },
            ],
          },
        ],
      });
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error in getAllByCustomerId:", error);
      res.status(500).json({ error: error.message });
    }
  },
  createOrder: async (req, res) => {
    try {
      const {
        customerId,
        billingDetails,
        currencyId,
        isDeliveryAddressSame,
        entityType,
        total,
        cart,
        deliveryDetails,
      } = req.body;
      let customer;
      if (customerId) {
        customer = await models.customer.findOne({
          where: { user_id: customerId },
        });
      } else {
        customer = await models.customer.findOne({
          where: { user_id: req.session.uuid },
        });
      }

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      const findAddress = async (details) => {
        return await models.address.findOne({
          where: {
            apt: details.address.apt ?? null,
            city: details.address.city,
            country: details.address.country,
            num: details.address.number,
            state: details.address.state,
            street: details.address.street,
            zip: details.address.zip,
          },
        });
      };
      console.log(billingDetails);
      let billingAddress = await findAddress(billingDetails);
      if (!billingAddress) {
        billingAddress = await models.address.create({
          apt: billingDetails.address.apt ?? null,
          city: billingDetails.address.city,
          country: billingDetails.address.country,
          num: billingDetails.address.number,
          state: billingDetails.address.state,
          street: billingDetails.address.street,
          zip: billingDetails.address.zip,
        });
      }
      let deliveryAddress = billingAddress;
      if (!isDeliveryAddressSame) {
        deliveryAddress = await findAddress(deliveryDetails);
        if (!deliveryAddress) {
          deliveryAddress = await models.address.create({
            apt: deliveryDetails.address.apt ?? null,
            city: deliveryDetails.address.city,
            country: deliveryDetails.address.country,
            num: deliveryDetails.address.number,
            state: deliveryDetails.address.state,
            street: deliveryDetails.address.street,
            zip: deliveryDetails.address.zip,
          });
        }
      }
      if (!cart || cart.length == 0) {
        return res.status(404).json({ error: "Cart is empty" });
      }
      const newOrder = await models.orders.create({
        customer_id: customer.id,
        shipping_address_id: deliveryAddress.id,
        currency_id: currencyId,
        total,
        billing_address_id: billingAddress.id,
      });
      await models.customer.create({
        type: "buyer",
        order_id: newOrder.id,
        user_id: customer.id,
        email: billingDetails.email,
        name: billingDetails.name,
        phone: billingDetails.phone.countryCode + billingDetails.phone.number,
        taxNumber: billingDetails.taxNumber,
        shipping_address_id: deliveryAddress.id,
        billing_address_id: billingAddress.id,
        billing_name: billingDetails.name,
        shipping_name: deliveryDetails?.name ?? billingDetails.name,
      });
      for (const item of cart) {
        await models.ordersitem.create({
          orders_id: newOrder.id,
          product_id: item.product.id,
          quantity: item.quantity,
        });
      }
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error in createOrder:", error);
      res.status(500).json({ error: error.message });
    }
  },
  updateOrderStatus: async (req, res) => {
    try {
      const { data } = req.body;
      const order = await models.orders.findByPk(data.orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      await order.update({ status: data.status });
      res.status(200).json(order);
    } catch (error) {
      console.error("Error in updateOrderStatus:", error);
      res.status(500).json({ error: error.message });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await models.orders.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      await order.destroy();
      res.status(204).end();
    } catch (error) {
      console.error("Error in deleteOrder:", error);
      res.status(500).json({ error: error.message });
    }
  },
};
module.exports = OrdersController;
