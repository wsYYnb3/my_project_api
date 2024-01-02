const initModels = require("../models/init-models");

const { v4: uuidv4 } = require("uuid");
const { getProductAssociations } = require("../helpers/helpers");
const { getCustomerById } = require("../middlewares/customer/getCustomerById");
const { sequelize } = require("../helpers/helpers");

const models = initModels(sequelize);
async function getOrCreateCustomer(customerId, session) {
  if (!customerId) {
    if (!session.uuid) {
      session.uuid = uuidv4();
      await session.save();
    }
    customerId = session.uuid;
  }

  let customer = await models.customer.findOne({
    where: { user_id: customerId },
  });

  if (!customer) {
    customer = await models.customer.create({
      user_id: customerId,
      type: customerId === session.uuid ? "guest" : "registered",
    });
  }

  return customer;
}

const CartController = {
  getAllByCustomerId: async (req, res) => {
    try {
      let customerId = req.params.customerId || req.body.customerId;

      let customer = await models.customer.findOne({
        where: { user_id: customerId },
      });

      if (!customer) {
        // Create a new customer with the given customerId if not found
        customer = await models.customer.create({
          user_id: customerId,
          type: "guest",
        });
      }

      const cartItems = await models.cartitem.findAll({
        where: { customer_id: customer.id, DeletedAt: null },
        include: [
          {
            model: models.product,
            as: "product",
            include: getProductAssociations(models),
          },
        ],
        attributes: ["quantity"],
      });
      console.log(cartItems);
      res.status(200).json(cartItems);
    } catch (error) {
      console.error("Error in getAllByCustomerId:", error);
      res.status(500).json({ error: error.message });
    }
  },

  addToCart: async (req, res) => {
    try {
      const { productId, quantity, customerId } = req.body;
      console.log(req.body);
      let customer = await models.customer.findOne({
        where: { user_id: customerId },
      });

      if (!customer) {
        // Create a new customer with the given customerId if not found
        customer = await models.customer.create({
          user_id: customerId,
          type: "guest",
        });
      }

      if (!productId || !quantity) {
        return res
          .status(400)
          .json({ error: "Product ID and quantity are required" });
      }

      const product = await models.product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      let cartItem = await models.cartitem.findOne({
        where: {
          customer_id: customer.id,
          product_id: productId,
          DeletedAt: null,
        },
      });
      if (cartItem) {
        await cartItem.update({
          customer_id: customer.id,
          product_id: productId,
          quantity: cartItem.quantity + req.body.quantity,
        });
      } else {
        cartItem = await models.cartitem.create({
          customer_id: customer.id,
          product_id: productId,
          quantity,
        });
      }
      const newCartItemWithDetails = await models.cartitem.findOne({
        where: { id: cartItem.id },
        include: [
          {
            model: models.product,
            as: "product",
            include: getProductAssociations(models),
          },
        ],
        attributes: ["id", "quantity"],
      });

      res
        .status(201)
        .json({ newCartItemWithDetails, customerId: customer.user_id });
    } catch (error) {
      console.error("Error in addToCart:", error);
      res.status(500).json({ error: error.message });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { customer_id, product_id } = req.body;
      let customer;
      if (customer_id) {
        customer = await models.customer.findOne({
          where: { user_id: customer_id },
        });
      } else {
        customer = await models.customer.findOne({
          where: { user_id: req.session.uuid },
        });
      }

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      const cartItem = await models.cartitem.findOne({
        where: { product_id: product_id, customer_id: customer.id },
      });

      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      await cartItem.destroy();
      res.status(204).end();
    } catch (error) {
      console.error("Error in removeFromCart:", error);
      res.status(500).json({ error: error.message });
    }
  },
  clearCart: async (req, res) => {
    try {
      const { customerId } = req.body;
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

      const cartItems = await models.cartitem.findAll({
        where: { customer_id: customer.id },
      });

      if (!cartItems) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      await Promise.all(cartItems.map(async (item) => item.destroy()));

      res.status(204).end();
    } catch (error) {
      console.error("Error in removeFromCart:", error);
      res.status(500).json({ error: error.message });
    }
  },

  updateCartItem: async (req, res) => {
    try {
      const { cartItemId } = req.params;
      const cartItem = await models.cartitem.findByPk(cartItemId);

      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      await cartItem.update(req.body);
      res.status(200).json(cartItem);
    } catch (error) {
      console.error("Error in updateCartItem:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = CartController;
