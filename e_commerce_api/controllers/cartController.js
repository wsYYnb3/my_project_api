const initModels = require("../models/init-models");
const Sequelize = require("sequelize");
const { getProductAssociations } = require("../helpers/helpers");
const sequelize = new Sequelize("EcommerceDB", "root", "asdf4321", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});

const models = initModels(sequelize);

const CartController = {
  // Get all cart items for a specific customer
  getAllByCustomerId: async (req, res) => {
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

      const cartItems = await models.cartitem.findAll({
        where: { customer_id: customer.id, deleted_at: null },
        include: [
          {
            model: models.product,
            as: "product",
            include: getProductAssociations(models),
          },
        ],
        attributes: ["quantity"],
      });

      console.log("Cart Items sent:", cartItems);
      res.status(200).json(cartItems);
    } catch (error) {
      console.error("Error in getAllByCustomerId:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Add an item to the cart
  addToCart: async (req, res) => {
    try {
      const { productId, quantity, customerId } = req.body;

      const customer = await models.customer.findOne({
        where: { user_id: customerId },
      });

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
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
          deleted_at: null,
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

      res.status(201).json(newCartItemWithDetails);
    } catch (error) {
      console.error("Error in addToCart:", error);
      res.status(500).json({ error: error.message });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { product_id, customer_id } = req.body;
      const customer = await models.customer.findOne({
        where: { user_id: customer_id },
      });

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const cartItem = await models.cartitem.findOne({
        where: { product_id: product_id, customer_id: customer.id },
      });

      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      //await cartItem.update({ deleted_at: Date.now() });
      await cartItem.destroy();
      res.status(204).end();
    } catch (error) {
      console.error("Error in removeFromCart:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update a cart item (e.g., update quantity)
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
