const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middlewares/admin/verifyAdmin");

router.get("/verify/:id", verifyAdmin);

// Add an item to the cart
/*router.post("/add/:customerId", CartController.addToCart);

// Remove an item from the cart
router.delete("/update", CartController.removeFromCart);

// Update a cart item
router.put("/update", CartController.updateCartItem);
router.delete("/update", CartController.removeFromCart);
router.delete("/clear", CartController.clearCart);*/
module.exports = router;
