const express = require("express");
const router = express.Router();
const TicketController = require("../controllers/ticketController");

router.get("/get/all", TicketController.getAllTicket);
router.post("/add/:customerId", TicketController.sendTicket);
router.put("/update/:ticketId", TicketController.updateTicket);
router.get("/get/all/id", TicketController.updateTicket);
module.exports = router;
