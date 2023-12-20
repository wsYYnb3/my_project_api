const express = require("express");
const router = express.Router();
const TicketController = require("../controllers/ticketController");
const verifyAdminMW = require("../middlewares/admin/verifyAdminMW");
router.get("/get/all_ids", TicketController.getAllTicketsID);
router.get("/get/all/", verifyAdminMW, TicketController.getAllTicket);
router.post("/add/:customerId", TicketController.sendTicket);
router.put("/update/:ticketId", verifyAdminMW, TicketController.updateTicket);

module.exports = router;