const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

router.get("/search", ProductController.search);

module.exports = router;
