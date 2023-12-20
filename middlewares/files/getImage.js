const path = require("path");
const fs = require("fs");

/**
 * The getImage middleware is responsible for checking the accessibility of a specific image
 * and then attaching its path to the response object.
 *
 @param {*} req Express request object containing incoming HTTP request details.
@param {*} res Express response object used to send back data or handle redirects.
@param {*} next Function to pass control to the next middleware or route handler.
 */
function getImage(req, res, next) {
  const imageFileName = "banner.jpeg";
  const imagePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "images",
    imageFileName
  );

  const webAccessiblePath = `/public/images/${imageFileName}`;

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.locals.imageNotFound = true;
      console.error("Image not accessible:", err);
      return next();
    }

    res.locals.imageUrl = webAccessiblePath;
    next();
  });
}

module.exports = getImage;
