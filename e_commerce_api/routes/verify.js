const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middlewares/admin/verifyAdmin");
router.get("/verify/:id", verifyAdmin);
/*router.post("/add/:customerId", CartController.addToCart);
router.delete("/update", CartController.removeFromCart);
router.put("/update", CartController.updateCartItem);
router.delete("/update", CartController.removeFromCart);
router.delete("/clear", CartController.clearCart);*/
module.exports = router;
