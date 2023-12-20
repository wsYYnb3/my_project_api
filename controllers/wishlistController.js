const initModels = require("../models/init-models");

const { getProductAssociations } = require("../helpers/helpers");
const { sequelize } = require("../helpers/helpers");

const models = initModels(sequelize);

const WishListController = {
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

      const wishListItems = await models.wishlistitem.findAll({
        where: { customer_id: customer.id, DeletedAt: null },
        include: [
          {
            model: models.product,
            as: "product",
            include: getProductAssociations(models),
          },
        ],
      });

      res.status(200).json(wishListItems);
    } catch (error) {
      console.error("Error in getAllByCustomerId:", error);
      res.status(500).json({ error: error.message });
    }
  },

  addToWishList: async (req, res) => {
    try {
      const { productId, customerId } = req.body;

      const customer = await models.customer.findOne({
        where: { user_id: customerId },
      });

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      if (!productId) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const product = await models.product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const wishListItem = await models.wishlistitem.create({
        customer_id: customer.id,
        product_id: productId,
        DeletedAt: null,
      });
      const newWishListItemWithDetails = await models.cartitem.findOne({
        where: { id: wishListItem.id },
        include: [
          {
            model: models.product,
            as: "product",
            include: getProductAssociations(models),
          },
        ],
        attributes: ["id"],
      });

      res.status(201).json(newWishListItemWithDetails);
    } catch (error) {
      console.error("Error in addToWishList:", error);
      res.status(500).json({ error: error.message });
    }
  },

  removeFromWishList: async (req, res) => {
    try {
      console.log("body", req.body);
      const { productId, customerId } = req.body;
      const customer = await models.customer.findOne({
        where: { user_id: customerId },
      });

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const wishListItem = await models.wishlistitem.findOne({
        where: { product_id: productId, customer_id: customer.id },
      });

      if (!wishListItem) {
        return res.status(404).json({ error: "Wishlist item not found" });
      }

      await wishListItem.destroy();
      res.status(204).end();
    } catch (error) {
      console.error("Error in removeFromWishList:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = WishListController;
