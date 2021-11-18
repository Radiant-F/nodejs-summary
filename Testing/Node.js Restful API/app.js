const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const postRoute = require("./router/posts");

app.use("/posts", postRoute);

// ROUTES
app.get("/", (req, res) => {
  res.send("Kita dirumah");
});

app.get("/posts", (req, res) => {
  res.send("Kita dipost");
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("connected to DB")
);

// Listen to server
app.listen(3000);
// mongodb+srv://Fadilah:<password>@cluster0.wfoqd.mongodb.net/test
