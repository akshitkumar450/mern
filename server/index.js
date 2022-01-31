const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
// for cookie
app.use(
  session({
    key: "user",
    secret: "super-secret",
    saveUninitialized: true,
    resave: true,
    cookie: {
      expires: 60 * 60 * 24, // 24 hours
    },
  })
);

const dotenv = require("dotenv");
// path to env file
dotenv.config({
  path: "./config.env",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MONGODB database Connection
const DB = process.env.MONGODB_CONNECTION.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);
mongoose.connect(DB).then((db) => {
  console.log("db connection success");
});

const authRouter = require("./routes/authRoutes");
app.use("/", authRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("app running");
});
