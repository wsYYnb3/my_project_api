const initModels = require("../../models/init-models");

const { sequelize } = require("../../helpers/helpers");
const models = initModels(sequelize);

async function verifyAdmin(req, res, next) {
  try {
    console.log("REQ.params", req.params);
    const { id } = req.params;
    console.log("ID", id);
    const admin = await models.admin.findOne({ where: { id: id } });
    const user = await models.customer.findOne({ where: { user_id: id } });
    if (admin) {
      res.status(200).json(admin);
      // next();
    } else {
      if (user) {
        res.status(200).json("user");
        // next();
      } else {
        res.status(404).json({ error: "Not admin" });
      }
      //  next();
    }
  } catch (error) {
    console.error("Error in Admin verification", error);
    res.status(500).json({ error: error.message });
  }
}
module.exports = verifyAdmin;
