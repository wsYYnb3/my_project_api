const express = require("express");
const router = express.Router();
const OrdersController = require("../controllers/ordersController");

router.get("/get/:customerId", OrdersController.getAllByCustomerId);

router.post("/add/:customerId", OrdersController.createOrder);

router.delete("/del", OrdersController.deleteOrder);

router.put("/update", OrdersController.updateOrderStatus);

module.exports = router;
