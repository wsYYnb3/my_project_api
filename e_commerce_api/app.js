require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const productsRouter = require("./routes/products");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const translationsRouter = require("./routes/translations");
const categoriesRouter = require("./routes/categories");
const { Clerk } = require("@clerk/clerk-sdk-node");
const webhooksRouter = require("./routes/webhooks");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const searchRouter = require("./routes/search");
const { Webhook } = require("svix");
console.log(Webhook);
if (!process.env.CLERK_SECRET_KEY) {
  throw new Error("Missing Clerk Secret Key");
}

var app = express();
const clerk = new Clerk({
  apiKey: process.env.CLERK_SECRET_KEY,
});
//const svix = new Svix(process.env.SVIX_SECRET_KEY);
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/json" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use((req, res, next) => {
  req.clerk = clerk;
  next();
});
/*app.use(async (req, res, next) => {
  req.clerk = clerk;
  try {
    req.clientList = await clerk.users.getUserList();
    console.log(req.clientList);
  } catch (e) {
    console.log("Failed to get client list:", e);
  }
  next();
});*/
app.post("/webhook", async function (req, res) {
  try {
    let payload = req.body;
    if (!Buffer.isBuffer(payload)) {
      console.log("Converting payload to Buffer.");
      payload = Buffer.from(JSON.stringify(payload));
    }
    const headers = req.headers;
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET_KEY;
    if (!webhookSecret) {
      console.error("Webhook secret is empty");
      return res.status(500).send("Internal Server Error");
    }

    const wh = new Webhook(webhookSecret);
    const evt = wh.verify(payload, headers);
    const id = evt.data.id;
    const eventType = evt.type;
    console.log("Event: ", eventType);
    console.log(evt);
    if (eventType === "user.created") {
      console.log(`User ${id} was ${eventType}`);
      console.log(evt.data.email_addresses[0].email_address);
      await userController.storeWebhookUserData(evt);
    }
    if (evt.data && evt.data.user_id) {
      userController.setUserCookie(res, evt.data.user_id);
    }
    res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/products", productsRouter);
//app.use("/webhook", webhooksRouter);
app.use("/categories", categoriesRouter);
app.use("/", indexRouter);
app.use("/customer", usersRouter);
app.use("/api", translationsRouter);
/*app.get("/test", async (req, res) => {
  try {
    const clientList = await clerk.users.getUserList();
    console.log(clientList);
    res.send(clientList);
  } catch (e) {
    console.log("Failed to get client list:", e);
    res.status(500).send("Internal Server Error");
  }
});*/
app.use("/api", searchRouter);
app.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRoutes);
module.exports = app;
