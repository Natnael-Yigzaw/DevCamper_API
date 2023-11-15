const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send({ error: "Authorization header is missing" });
  }

  const authHeader = req.headers.authorization;
  const [scheme, token] = authHeader.split(" ");

  if (!/^Bearer$/i.test(scheme)) {
    return res
      .status(401)
      .send({ error: "Format is incorrect! Use Bearer <TOKEN>" });
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Not Authorized: Token is invalid or expired" });
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
