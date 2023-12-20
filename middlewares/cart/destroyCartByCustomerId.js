const initModels = require("../models/init-models");
const { sequelize } = require("../../helpers/helpers");
import getCustomerById from "../customer/getCustomerById";
const models = initModels(sequelize);

async function destroyCartByUserId(req, res, next) {
  const customerId = req.params;
  customer = getCustomerById(customerId);
}
module.exports = destroyCartByUserId;
