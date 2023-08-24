/**
 * A middleware function that gets 5 newest products and attaches the parsed products data to the res.locals.newestProducts property. If an error occurs during the file reading process, it returns a 500 status with an appropriate error message.
@param {*} req Express request object containing incoming HTTP request details.
@param {*} res Express response object used to send back data or handle redirects.
@param {*} next Function to pass control to the next middleware or route handler.
 */

function getNewestProducts(req, res, next) {
  const products = res.locals.products;

  const sortedProducts = products.sort(
    (a, b) => Date.parse(b.date_added) - Date.parse(a.date_added)
  );
  const newestProducts = sortedProducts.slice(0, 5);

  res.locals.newestProducts = newestProducts;
  next();
}

module.exports = getNewestProducts;
