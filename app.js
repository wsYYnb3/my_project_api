require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const session = require("express-session");
const productsRouter = require("./routes/products");
const addressRouter = require("./routes/address");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");
const wishlistRoutes = require("./routes/wishlist");
const translationsRouter = require("./routes/translations");
const categoriesRouter = require("./routes/categories");
const { Clerk } = require("@clerk/clerk-sdk-node");
const webhooksRouter = require("./routes/webhooks");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const searchRouter = require("./routes/search");
const { Webhook } = require("svix");
const verifyRouter = require("./routes/verify");
const imagesRouter = require("./routes/images");
const ticketRouter = require("./routes/ticket");
if (!process.env.CLERK_SECRET_KEY) {
  throw new Error("Missing Clerk Secret Key");
}
const session_secret = process.env.SESSION_SECRET;
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
const allowedOrigins = ["http://localhost:3000", process.env.FRONTEND_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use((req, res, next) => {
  req.clerk = clerk;
  next();
});

app.post("/webhook", async function (req, res) {
  try {
    let payload = req.body;
    if (!Buffer.isBuffer(payload)) {
      payload = Buffer.from(JSON.stringify(payload));
    }
    const headers = req.headers;
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET_KEY;
    if (!webhookSecret) {
      console.error("Webhook secret is empty");
      return res.status(500).send("Internal Server Error");
    }
    console.log(webhookSecret);
    const wh = new Webhook(webhookSecret);
    const evt = wh.verify(payload, headers);
    const id = evt.data.id;
    const eventType = evt.type;
    if (eventType === "user.created") {
      console.log(`User ${id}  ${eventType}`);
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
app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 60000 },
  })
);

app.use("/products", productsRouter);

app.use("/categories", categoriesRouter);
app.use("/", indexRouter);
app.use("/customer", usersRouter);
app.use("/api", translationsRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/address", addressRouter);
app.use("/api", searchRouter);
app.use("/orders", ordersRoutes);
app.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/admin", verifyRouter);
app.use("/", imagesRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/ticket", ticketRouter);
app.use("/api", usersRouter);
module.exports = app;
