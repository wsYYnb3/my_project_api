const fs = require("fs");
const path = require("path");
/**

A middleware function that reads the translation file based on the provided language_code parameter.
It verifies the provided language_code against a list of supported languages.
If the language is supported, it fetches the appropriate translation file and attaches the parsed data to the res.locals.translation property.
In the event of a file read error or if the language is not supported, appropriate actions are taken:
For an unsupported language, the request is redirected to the default "en" route.
For file reading errors, a 500 status with a relevant error message is returned.
@param {*} req Express request object containing incoming HTTP request details.
@param {*} res Express response object used to send back data or handle redirects.
@param {*} next Function to pass control to the next middleware or route handler.
*/
function getTranslation(req, res, next) {
  const { language_code } = req.params;
  const supportedLanguages = ["en", "fr", "es", "he", "de", "hu"];

  if (supportedLanguages.includes(language_code)) {
    const filePath = path.join(
      __dirname,
      `../../public/translations/${language_code}.json`
    );

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Failed to read the language file" });
      }
      res.locals.translation = JSON.parse(data);
      next();
    });
  } else {
    //res.redirect("/en");
  }
}

module.exports = getTranslation;
