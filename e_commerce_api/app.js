var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const productsRouter = require("./routes/products");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const translationsRouter = require("./routes/translations");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/products", productsRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", translationsRouter);
module.exports = app;
