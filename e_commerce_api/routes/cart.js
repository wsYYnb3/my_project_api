const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cartController");

// Get cart items for a customer
router.get("/get/:customerId", CartController.getAllByCustomerId);

// Add an item to the cart
router.post("/add/:customerId", CartController.addToCart);

// Remove an item from the cart
router.delete("/update", CartController.removeFromCart);

// Update a cart item
router.put("/update", CartController.updateCartItem);
router.delete("/update", CartController.removeFromCart);
router.delete("/clear", CartController.clearCart);
module.exports = router;
