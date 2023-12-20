const fs = require("fs");
const path = require("path");
/**
 * A middleware function that gets categories and attaches the parsed categories data to the res.locals.categories property. If an error occurs during the file reading process, it returns a 500 status with an appropriate error message.
 @param {*} req Express request object containing incoming HTTP request details.
@param {*} res Express response object used to send back data or handle redirects.
@param {*} next Function to pass control to the next middleware or route handler.
 */
function getCategories(req, res, next) {
  const filePath = path.join(__dirname, "/../../public/data/categories.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the categories.json:", err);
      return res
        .status(500)
        .json({ error: "Failed to read the categories file" });
    }

    res.locals.categories = JSON.parse(data);
    next();
  });
}

module.exports = getCategories;
