const initModels = require("../models/init-models");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("EcommerceDB", "root", "asdf4321", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});
import { get } from "../../app";
import getCustomerById from "../customer/getCustomerById";
const models = initModels(sequelize);

async function destroyCartByUserId(req, res, next) {
  const customerId = req.params;
  customer = getCustomerById(customerId);
}
module.exports = destroyCartByUserId;
