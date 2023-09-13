const initModels = require("../../models/init-models");
const Sequelize = require("sequelize");
const verifyClerkSession = require("../verifyClerkSession");
const sequelize = new Sequelize("EcommerceDB", "root", "asdf4321", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});
const models = initModels(sequelize);

async function verifyAdmin(req, res, next) {
  try {
    console.log(req);
    //verifyClerkSession(req, res, next);
    const { id } = req.params;
    const admin = await models.admin.findOne({ where: { id: id } });
    if (admin) {
      res.status(200).json(admin);
      // next();
    } else {
      res.status(404).json({ error: "Not admin" });
      //  next();
    }
  } catch (error) {
    console.error("Error in Admin verification", error);
    res.status(500).json({ error: error.message });
  }
}
module.exports = verifyAdmin;
