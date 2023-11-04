const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const connectDb = require("./config/db");

const bootCampRoute = require("./routes/bootcampRoute");

const PORT = process.env.PORT || 5000;

const app = express();

connectDb();

app.use(morgan("dev"));

app.use("/api/v1/bootcamp", bootCampRoute);

app.listen(PORT, console.log(`Server starting on port ${PORT}`));
