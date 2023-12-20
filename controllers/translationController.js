const Sequelize = require("sequelize");
const initModels = require("../models/init-models");
const sequelize = new Sequelize("EcommerceDB", "root", "asdf4321", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});
const models = initModels(sequelize);
const TranslationController = {
  getByLanguageCode: async (req, res) => {
    try {
      const languageCode = req.params.languageCode;
      const language = await models.language.findOne({
        where: { language_code: languageCode },
        include: {
          model: models.translation,
          as: "translations",
        },
      });
      if (language) {
        const translationsJson = {};
        language.translations.forEach((translation) => {
          translationsJson[translation.translation_key] =
            translation.translation_text;
        });
        res.status(200).json(translationsJson);
      } else {
        res.status(404).json({ error: "Language not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
module.exports = TranslationController;