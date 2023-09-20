const initModels = require("../../models/init-models");
const Sequelize = require("sequelize");
const verifyClerkSession = require("../verifyClerkSession");
const sequelize = new Sequelize("EcommerceDB", "root", "asdf4321", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});
const models = initModels(sequelize);

async function verifyAdminMW(req, res, next) {
  try {
    //verifyClerkSession(req, res, next);
    const data = req.body;

    const adminId =
      req.query.adminId ??
      req.params.adminId ??
      data.adminId ??
      data.data.adminId;
    console.log(data);
    console.log(req.query);
    console.log(req.params);
    if (adminId) {
      const admin = await models.admin.findOne({ where: { id: adminId } });
      if (admin) {
        next();
      } else {
        res.status(404).json({ error: "Not admin" });
      }
    } else {
      const id = data?.adminId ?? data?.data?.adminId ?? adminId;
      if (id) {
        const admin = await models.admin.findOne({ where: { id: id } });
        if (admin) {
          next();
        } else {
          res.status(404).json({ error: "Not admin" });
        }
      } else {
        res.status(500).json({ error: "No ID" });
      }
    }
  } catch (error) {
    console.error("Error in Admin verification", error);
    res.status(500).json({ error: error.message });
  }
}
module.exports = verifyAdminMW;
