const express = require("express");
const router = express.Router();
const AddressController = require("../controllers/addressController");
router.get("/get/billing/:customerId", AddressController.getBillingAddress);
router.get("/get/shipping/:customerId", AddressController.getShippingAddress);
router.get("/get/all/:customerId", AddressController.getAllAddress);
module.exports = router;
