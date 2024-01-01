const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const Webhook = require("svix");
const router = express.Router();

router.post("/webhook", express.json(), async function (req, res) {
  try {
    const payload = req.body;
    const headers = req.headers;

    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET_KEY;
    if (!webhookSecret) {
      console.error(
        "Webhook secret is empty. Please check your environment variables."
      );
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
    const evt = wh.verify(payload, headers);
    const id = evt.data.id;

    const eventType = evt.type;
    if (eventType === "user.created") {
    }

    res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
