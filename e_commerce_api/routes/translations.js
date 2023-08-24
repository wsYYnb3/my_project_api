const TranslationController = require("../controllers/translationController");
const express = require("express");
const router = express.Router();

router.get(
  "/translations/:languageCode",
  TranslationController.getByLanguageCode
);

module.exports = router;
