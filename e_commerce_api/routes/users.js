const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Create new customer
/*router.post("/customer", userController.createCustomer);
router.get("/customer/list", userController.getCustomerList);
router.get("/customer/:id", userController.getCustomerById);
// Update existing customer
router.put("/customer/:id", userController.updateCustomer);

// Add item to wishlist (Requires Clerk authentication)
router.get("/customer/:id/wishlist", userController.getWishlist);
router.post("/customer/:id/wishlist", userController.addToWishlist);

// Add item to cart
router.get("/customer/:id/cart", userController.getCart);
router.post("/customer/:id/cart", userController.addToCart);
*/
module.exports = router;
