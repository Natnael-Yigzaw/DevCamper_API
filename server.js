const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
require("colors");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");
const { connectDb } = require("./config/db");

// Load environment variables
dotenv.config();

// Set up Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDb();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
const bootCampRoute = require("./routes/bootcampRoute");
const courseRoute = require("./routes/courseRoute");
app.use("/api/v1/bootcamps", bootCampRoute);
app.use("/api/v1/courses", courseRoute);

// Error handling middleware
app.use(errorHandler);

// Server start
app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`.yellow.bold);
});
