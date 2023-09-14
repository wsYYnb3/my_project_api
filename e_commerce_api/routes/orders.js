const express = require("express");
const router = express.Router();
const OrdersController = require("../controllers/ordersController");
const verifyAdminMW = require("../middlewares/admin/verifyAdminMW");
router.get("/get/:customerId", OrdersController.getAllByCustomerId);

router.post("/add/:customerId", OrdersController.createOrder);

router.delete("/del", OrdersController.deleteOrder);

router.put("/update", verifyAdminMW, OrdersController.updateOrderStatus);
router.get("/admin/", OrdersController.getAll);
module.exports = router;
