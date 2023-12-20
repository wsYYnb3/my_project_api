const express = require("express");
const router = express.Router();
const WishListController = require("../controllers/wishlistController");

router.get("/get/:customerId", WishListController.getAllByCustomerId);

router.post("/add/:customerId", WishListController.addToWishList);

router.delete("/update", WishListController.removeFromWishList);

module.exports = router;
