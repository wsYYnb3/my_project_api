const express = require("express");
const router = express.Router();
const getImage = require("../middlewares/files/getImage");
const getTranslation = require("../middlewares/files/getTranslation");
const getProducts = require("../middlewares/products/getProducts");
const getNewestProducts = require("../middlewares/products/getNewestProducts");
const getCategories = require("../middlewares/categories/getCategories");

router.get("/", (req, res) => {
  res.redirect("/en");
});

router.get(
  "/:language_code",
  getImage,
  getTranslation,
  getProducts,
  getNewestProducts,
  getCategories,
  (req, res) => {
    const response = {
      imageUrl: res.locals.imageUrl,
      newestProducts: res.locals.newestProducts,
      products: res.locals.products,
      categories: res.locals.categories,
    };

    if (res.locals.translation) {
      response.translation = res.locals.translation;
    } else {
      response.message = "Translation not found";
    }

    if (res.locals.imageNotFound) {
      response.imageMessage = "Image not found";
    }

    res.json(response);
  }
);
router.get(
  "/:language_code/newest",
  getProducts,
  getNewestProducts,
  (req, res) => {
    const response = {
      newestProducts: res.locals.newestProducts,
    };
    res.json(response);
  }
);
router.get(
  "/:language_code/products",
  getProducts,
  getNewestProducts,
  (req, res) => {
    const response = {
      products: res.locals.products,
    };
    res.json(response);
  }
);
router.get("/:language_code/categories", getCategories, (req, res) => {
  const response = {
    products: res.locals.categories,
  };
  res.json(response);
});
module.exports = router;
