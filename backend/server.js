require("dotenv").config();

const mongoconn = require("./database/mongoconn");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

const session = require("express-session");
const passport = require("passport");

const userRouter = require("./user/userRouter");
const authRouter = require("./user/authRouter");
require("./user/passport");

// database connection
mongoconn();

// Use session to keep track of login state
app.use(
  session({
    name: "session",
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API
app.listen(5000, () => {
  console.log("Server started on port 5000");
});

// Routers
app.use("/", userRouter);
app.use("/", authRouter);
