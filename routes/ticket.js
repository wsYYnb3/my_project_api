const express = require("express");
const router = express.Router();
const TicketController = require("../controllers/ticketController");
const verifyAdminMW = require("../middlewares/admin/verifyAdminMW");
router.get("/ticket/get/all_ids", TicketController.getAllTicketsID);
router.get("/ticket/get/all/", verifyAdminMW, TicketController.getAllTicket);
router.post("/ticket/add/:customerId", TicketController.sendTicket);
router.put(
  "/ticket/update/:ticketId",
  verifyAdminMW,
  TicketController.updateTicket
);

module.exports = router;
