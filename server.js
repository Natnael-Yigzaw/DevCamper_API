const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
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
app.use(cookieParser());
app.use(fileUpload());
app.use(morgan("dev"));
app.use(mongoSanitize());
app.use(helmet());
app.use(xssClean());
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 20 requests per windowMs
});
app.use(limiter);
app.use(hpp());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Routes
const bootCampRoute = require("./routes/bootcampRoute");
const courseRoute = require("./routes/courseRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const reviewRoute = require("./routes/reviewRoute");
app.use("/api/v1/bootcamps", bootCampRoute);
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/reviews", reviewRoute);

// Error handling middleware
app.use(errorHandler);

// Server start
app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`.yellow.bold);
});
