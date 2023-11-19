const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Mongoose Bad ObjectId
  if (err.name === "CastError") {
    error = new ErrorResponse(`Resource not found`, 404);
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    const message = "Duplicate field entered";
    error = new ErrorResponse(message, 409);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(errors, 400);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Server Error",
  });
};

module.exports = errorHandler;
