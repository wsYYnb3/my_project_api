const express = require("express");
const router = express.Router();
const WishListController = require("../controllers/wishlistController");

// Get cart items for a customer
router.get("/get/:customerId", WishListController.getAllByCustomerId);

// Add an item to the wishlist
router.post("/add/:customerId", WishListController.addToWishList);

// Remove an item from the wishlist
router.delete("/update", WishListController.removeFromWishList);

module.exports = router;
