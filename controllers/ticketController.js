const initModels = require("../models/init-models");

const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../helpers/helpers");

const models = initModels(sequelize);
function getTicketTypeId(ticketType) {
  switch (ticketType.toLowerCase()) {
    case "spam":
      return 5;
    case "generalquery":
      return 1;
    case "productissue":
      return 2;
    case "deliveryissue":
      return 3;
    default:
      return 4;
  }
}
const TicketController = {
  getAllTicket: async (req, res) => {
    try {
      const ticket = await models.ticket.findAll({
        where: { DeletedAt: null },
        include: [
          {
            model: models.customer,
            as: "customer",
            include: [
              {
                model: models.customer,
                as: "ParentCustomer",
                attributes: ["user_id", "id", "email", "name", "phone"],
              },
            ],
          },
          { model: models.tickettype, as: "ticket_type" },
        ],
      });
      res.status(200).json(ticket);
    } catch (error) {
      console.error("Error in getTickets:", error);
      res.status(500).json({ error: error.message });
    }
  },
  getAllTicketsID: async (req, res) => {
    try {
      const tickets = await models.ticket.findAll({
        where: { DeletedAt: null },
        attributes: ["id"],
      });
      res.status(200).json(tickets);
    } catch (error) {
      console.error("Error in getAllTicketsID:", error);
      res.status(500).json({ error: error.message });
    }
  },
  sendTicket: async (req, res) => {
    try {
      const { name, email, message, customerId } = req.body;
      console.log("BODY:", req.body);
      let customer;
      if (customerId) {
        customer = await models.customer.findOne({
          where: { user_id: customerId },
        });

        if (!customer) {
          return res.status(404).json({ error: "Customer not found" });
        }
        customer = await models.customer.create({
          user_id: customer.id,
          name: name,
          email: email,
          type: "ticket",
        });
      } else {
        if (!req.session.uuid) {
          req.session.uuid = uuidv4();
        }

        customer = await models.customer.findOne({
          where: { user_id: req.session.uuid },
        });

        if (!customer) {
          customer = await models.customer.create({
            user_id: req.session.uuid,
            name: name,
            email: email,
            type: "ticket",
          });
        } else {
          customer = await models.customer.create({
            user_id: customer.id,
            name: name,
            email: email,
            type: "ticket",
          });
        }
      }

      if (!message) {
        return res.status(400).json({ error: "Message is empty" });
      }
      const ticket = await models.ticket.create({
        customer_id: customer.id,
        description: message,
        status: "Processing",
        ticket_type_id: 4,
      });

      res.status(201).json(ticket);
    } catch (error) {
      console.error("Error in sendingTicket:", error);
      res.status(500).json({ error: error.message });
    }
  },

  updateTicket: async (req, res) => {
    try {
      const { ticketId } = req.params;
      const { status, ticketType } = req.body;

      const ticket = await models.ticket.findByPk(ticketId);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }

      if (!status || !ticketType) {
        return res
          .status(400)
          .json({ error: "Ticket needs a ticketTypeId and status" });
      }

      const ticketTypeId = getTicketTypeId(ticketType);

      await ticket.update({ status, ticket_type_id: ticketTypeId });

      res.status(200).json(ticket);
    } catch (error) {
      console.error("Error in updateTicket:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = TicketController;
