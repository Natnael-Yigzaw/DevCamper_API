const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  //? Mongoose Bad ObjectId

  if (err.name === "CastError") {
    const message = `Resource not found with this ID ${error.value}`;
    error = new ErrorResponse(message, 404);
  }

  //? Mongoose Duplicate Key

  if (err.code === 11000) {
    const message = "Duplicate field entered";
    error = new ErrorResponse(message, 409);
  }

  //? Mongoose Validation Error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(errors, 400);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Server Errror",
  });
};

module.exports = errorHandler;
