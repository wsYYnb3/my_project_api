const initModels = require("../models/init-models");
const Sequelize = require("sequelize");
const { getProductAssociations } = require("../helpers/helpers");
const sequelize = new Sequelize("EcommerceDB", "root", "asdf4321", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});

const models = initModels(sequelize);

const WishListController = {
  // Get all wishList items for a specific customer
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

  // Add an item to the wishlist
  addToWishList: async (req, res) => {
    try {
      const { product_id, customer_id } = req.body;

      const customer = await models.customer.findOne({
        where: { user_id: customer_id },
      });

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      if (!product_id) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const product = await models.product.findByPk(product_id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const wishListItem = await models.wishlistitem.create({
        customer_id: customer.id,
        product_id: product_id,
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
      const { product_id, customer_id } = req.body;
      const customer = await models.customer.findOne({
        where: { user_id: customer_id },
      });

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const wishListItem = await models.wishlistitem.findOne({
        where: { product_id: product_id, customer_id: customer.id },
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
