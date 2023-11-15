const express = require("express");
const router = express.Router();

// Import Controllers and Middleware
const bootcampController = require("../controllers/bootcampCtrl");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Import Models
const Bootcamp = require("../models/Bootcamp");

// Import Routes
const courseRouter = require("./courseRoute");

// Mount Course Router
router.use("/:bootcampId/course", courseRouter);

// Bootcamp Routes
router
  .route("/radius/:zipcode/:distance")
  .get(bootcampController.getBootcampsInRadius);

router
  .route("/:id/photo")
  .put(
    protect,
    authorize("publisher", "admin"),
    bootcampController.uploadPhoto
  );

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), bootcampController.getBootcamps)
  .post(
    protect,
    authorize("publisher", "admin"),
    bootcampController.createBootcamp
  );

router
  .route("/:id")
  .get(bootcampController.getBootcamp)
  .put(
    protect,
    authorize("publisher", "admin"),
    bootcampController.updateBootcamp
  )
  .delete(
    protect,
    authorize("publisher", "admin"),
    bootcampController.deleteBootcamp
  );

module.exports = router;
