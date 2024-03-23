const express = require("express");
const router = express.Router();
const TicketController = require("../controllers/ticketController");
const verifyAdmin = require("../middlewares/admin/verifyAdmin");
router.get("/ticket/get/all_ids", TicketController.getAllTicketsID);
router.get("/ticket/get/all/", verifyAdmin, TicketController.getAllTicket);
router.post("/ticket/add/:customerId", TicketController.sendTicket);
router.put(
  "/ticket/update/:ticketId",
  verifyAdmin,
  TicketController.updateTicket
);

module.exports = router;
