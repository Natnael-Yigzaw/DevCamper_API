const express = require("express");
require("dotenv").config();
require("colors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectDb = require("./config/db");

const bootCampRoute = require("./routes/bootcampRoute");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

connectDb();

app.use(morgan("dev"));

app.use("/api/v1/bootcamp", bootCampRoute);

app.listen(PORT, console.log(`Server starting on port ${PORT}`.yellow.bold));
