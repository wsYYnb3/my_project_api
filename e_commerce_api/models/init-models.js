var DataTypes = require("sequelize").DataTypes;
var _address = require("./address");
var _admin = require("./admin");
var _cartitem = require("./cartitem");
var _category = require("./category");
var _currency = require("./currency");
var _customer = require("./customer");
var _image = require("./image");
var _keyword = require("./keyword");
var _language = require("./language");
var _orders = require("./orders");
var _ordersitem = require("./ordersitem");
var _page = require("./page");
var _pagecontent = require("./pagecontent");
var _pageimage = require("./pageimage");
var _product = require("./product");
var _productcardimage = require("./productcardimage");
var _productcartimage = require("./productcartimage");
var _productimage = require("./productimage");
var _productkeyword = require("./productkeyword");
var _productpriceincurrency = require("./productpriceincurrency");
var _productspecification = require("./productspecification");
var _sequelizemeta = require("./sequelizemeta");
var _session = require("./session");
var _technicalinformation = require("./technicalinformation");
var _ticket = require("./ticket");
var _tickettype = require("./tickettype");
var _translation = require("./translation");
var _unitofmeasure = require("./unitofmeasure");
var _useractivity = require("./useractivity");
var _vendor = require("./vendor");
var _wishlistitem = require("./wishlistitem");

function initModels(sequelize) {
  var address = _address(sequelize, DataTypes);
  var admin = _admin(sequelize, DataTypes);
  var cartitem = _cartitem(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var currency = _currency(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var image = _image(sequelize, DataTypes);
  var keyword = _keyword(sequelize, DataTypes);
  var language = _language(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var ordersitem = _ordersitem(sequelize, DataTypes);
  var page = _page(sequelize, DataTypes);
  var pagecontent = _pagecontent(sequelize, DataTypes);
  var pageimage = _pageimage(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var productcardimage = _productcardimage(sequelize, DataTypes);
  var productcartimage = _productcartimage(sequelize, DataTypes);
  var productimage = _productimage(sequelize, DataTypes);
  var productkeyword = _productkeyword(sequelize, DataTypes);
  var productpriceincurrency = _productpriceincurrency(sequelize, DataTypes);
  var productspecification = _productspecification(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var session = _session(sequelize, DataTypes);
  var technicalinformation = _technicalinformation(sequelize, DataTypes);
  var ticket = _ticket(sequelize, DataTypes);
  var tickettype = _tickettype(sequelize, DataTypes);
  var translation = _translation(sequelize, DataTypes);
  var unitofmeasure = _unitofmeasure(sequelize, DataTypes);
  var useractivity = _useractivity(sequelize, DataTypes);
  var vendor = _vendor(sequelize, DataTypes);
  var wishlistitem = _wishlistitem(sequelize, DataTypes);

  keyword.belongsToMany(product, { as: 'product_id_products', through: productkeyword, foreignKey: "keyword_id", otherKey: "product_id" });
  product.belongsToMany(keyword, { as: 'keyword_id_keywords', through: productkeyword, foreignKey: "product_id", otherKey: "keyword_id" });
  customer.belongsTo(address, { as: "shipping_address", foreignKey: "shipping_address_id"});
  address.hasMany(customer, { as: "customers", foreignKey: "shipping_address_id"});
  customer.belongsTo(address, { as: "billing_address", foreignKey: "billing_address_id"});
  address.hasMany(customer, { as: "billing_address_customers", foreignKey: "billing_address_id"});
  orders.belongsTo(address, { as: "shipping_address", foreignKey: "shipping_address_id"});
  address.hasMany(orders, { as: "orders", foreignKey: "shipping_address_id"});
  orders.belongsTo(address, { as: "billing_address", foreignKey: "billing_address_id"});
  address.hasMany(orders, { as: "billing_address_orders", foreignKey: "billing_address_id"});
  vendor.belongsTo(address, { as: "address", foreignKey: "address_id"});
  address.hasMany(vendor, { as: "vendors", foreignKey: "address_id"});
  product.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(product, { as: "products", foreignKey: "category_id"});
  orders.belongsTo(currency, { as: "currency", foreignKey: "currency_id"});
  currency.hasMany(orders, { as: "orders", foreignKey: "currency_id"});
  productpriceincurrency.belongsTo(currency, { as: "currency", foreignKey: "currency_id"});
  currency.hasMany(productpriceincurrency, { as: "productpriceincurrencies", foreignKey: "currency_id"});
  cartitem.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(cartitem, { as: "cartitems", foreignKey: "customer_id"});
  orders.belongsTo(customer, { as: "customer_customer", foreignKey: "customer_id"});
  customer.hasMany(orders, { as: "customer_orders", foreignKey: "customer_id"});
  session.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(session, { as: "sessions", foreignKey: "customer_id"});
  ticket.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(ticket, { as: "tickets", foreignKey: "customer_id"});
  useractivity.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(useractivity, { as: "useractivities", foreignKey: "customer_id"});
  wishlistitem.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(wishlistitem, { as: "wishlistitems", foreignKey: "customer_id"});
  pageimage.belongsTo(image, { as: "image", foreignKey: "image_id"});
  image.hasMany(pageimage, { as: "pageimages", foreignKey: "image_id"});
  productcardimage.belongsTo(image, { as: "image", foreignKey: "image_id"});
  image.hasMany(productcardimage, { as: "productcardimages", foreignKey: "image_id"});
  productcartimage.belongsTo(image, { as: "image", foreignKey: "image_id"});
  image.hasMany(productcartimage, { as: "productcartimages", foreignKey: "image_id"});
  productimage.belongsTo(image, { as: "image", foreignKey: "image_id"});
  image.hasMany(productimage, { as: "productimages", foreignKey: "image_id"});
  product.belongsTo(keyword, { as: "keyword", foreignKey: "keyword_id"});
  keyword.hasMany(product, { as: "products", foreignKey: "keyword_id"});
  productkeyword.belongsTo(keyword, { as: "keyword", foreignKey: "keyword_id"});
  keyword.hasMany(productkeyword, { as: "productkeywords", foreignKey: "keyword_id"});
  translation.belongsTo(language, { as: "language", foreignKey: "language_id"});
  language.hasMany(translation, { as: "translations", foreignKey: "language_id"});
  customer.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(customer, { as: "customers", foreignKey: "order_id"});
  ordersitem.belongsTo(orders, { as: "order", foreignKey: "orders_id"});
  orders.hasMany(ordersitem, { as: "ordersitems", foreignKey: "orders_id"});
  pagecontent.belongsTo(page, { as: "page", foreignKey: "page_id"});
  page.hasMany(pagecontent, { as: "pagecontents", foreignKey: "page_id"});
  pageimage.belongsTo(page, { as: "page", foreignKey: "page_id"});
  page.hasMany(pageimage, { as: "pageimages", foreignKey: "page_id"});
  useractivity.belongsTo(page, { as: "page", foreignKey: "page_id"});
  page.hasMany(useractivity, { as: "useractivities", foreignKey: "page_id"});
  cartitem.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(cartitem, { as: "cartitems", foreignKey: "product_id"});
  ordersitem.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(ordersitem, { as: "ordersitems", foreignKey: "product_id"});
  productcardimage.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(productcardimage, { as: "productcardimages", foreignKey: "product_id"});
  productcartimage.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(productcartimage, { as: "productcartimages", foreignKey: "product_id"});
  productimage.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(productimage, { as: "productimages", foreignKey: "product_id"});
  productkeyword.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(productkeyword, { as: "productkeywords", foreignKey: "product_id"});
  productpriceincurrency.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(productpriceincurrency, { as: "productpriceincurrencies", foreignKey: "product_id"});
  productspecification.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(productspecification, { as: "productspecifications", foreignKey: "product_id"});
  technicalinformation.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(technicalinformation, { as: "technicalinformations", foreignKey: "product_id"});
  wishlistitem.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(wishlistitem, { as: "wishlistitems", foreignKey: "product_id"});
  useractivity.belongsTo(session, { as: "session", foreignKey: "session_id"});
  session.hasMany(useractivity, { as: "useractivities", foreignKey: "session_id"});
  ticket.belongsTo(tickettype, { as: "ticket_type", foreignKey: "ticket_type_id"});
  tickettype.hasMany(ticket, { as: "tickets", foreignKey: "ticket_type_id"});
  category.belongsTo(translation, { as: "name_key_translation", foreignKey: "name_key"});
  translation.hasMany(category, { as: "categories", foreignKey: "name_key"});
  category.belongsTo(translation, { as: "slug_key_translation", foreignKey: "slug_key"});
  translation.hasMany(category, { as: "slug_key_categories", foreignKey: "slug_key"});
  keyword.belongsTo(translation, { as: "keyword_key_translation", foreignKey: "keyword_key"});
  translation.hasMany(keyword, { as: "keywords", foreignKey: "keyword_key"});
  page.belongsTo(translation, { as: "name_key_translation", foreignKey: "name_key"});
  translation.hasMany(page, { as: "pages", foreignKey: "name_key"});
  page.belongsTo(translation, { as: "slug_key_translation", foreignKey: "slug_key"});
  translation.hasMany(page, { as: "slug_key_pages", foreignKey: "slug_key"});
  pagecontent.belongsTo(translation, { as: "content_key_translation", foreignKey: "content_key"});
  translation.hasMany(pagecontent, { as: "pagecontents", foreignKey: "content_key"});
  product.belongsTo(translation, { as: "name_key_translation", foreignKey: "name_key"});
  translation.hasMany(product, { as: "products", foreignKey: "name_key"});
  product.belongsTo(translation, { as: "slug_key_translation", foreignKey: "slug_key"});
  translation.hasMany(product, { as: "slug_key_products", foreignKey: "slug_key"});
  product.belongsTo(translation, { as: "origin_key_translation", foreignKey: "origin_key"});
  translation.hasMany(product, { as: "origin_key_products", foreignKey: "origin_key"});
  product.belongsTo(translation, { as: "description_key_translation", foreignKey: "description_key"});
  translation.hasMany(product, { as: "description_key_products", foreignKey: "description_key"});
  productspecification.belongsTo(translation, { as: "content_key_translation", foreignKey: "content_key"});
  translation.hasMany(productspecification, { as: "productspecifications", foreignKey: "content_key"});
  technicalinformation.belongsTo(translation, { as: "info_key_translation", foreignKey: "info_key"});
  translation.hasMany(technicalinformation, { as: "technicalinformations", foreignKey: "info_key"});
  product.belongsTo(unitofmeasure, { as: "unit_of_measure", foreignKey: "unit_of_measure_id"});
  unitofmeasure.hasMany(product, { as: "products", foreignKey: "unit_of_measure_id"});
  product.belongsTo(vendor, { as: "vendor", foreignKey: "vendor_id"});
  vendor.hasMany(product, { as: "products", foreignKey: "vendor_id"});

  return {
    address,
    admin,
    cartitem,
    category,
    currency,
    customer,
    image,
    keyword,
    language,
    orders,
    ordersitem,
    page,
    pagecontent,
    pageimage,
    product,
    productcardimage,
    productcartimage,
    productimage,
    productkeyword,
    productpriceincurrency,
    productspecification,
    sequelizemeta,
    session,
    technicalinformation,
    ticket,
    tickettype,
    translation,
    unitofmeasure,
    useractivity,
    vendor,
    wishlistitem,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
