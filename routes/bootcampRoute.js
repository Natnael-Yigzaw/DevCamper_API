const express = require("express");
const router = express.Router();

// Import Controllers and Middleware
const bootcampController = require("../controllers/bootcampCtrl");
const advancedResults = require("../middleware/advancedResults");

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

router.route("/:id/photo").put(bootcampController.uploadPhoto);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), bootcampController.getBootcamps)
  .post(bootcampController.createBootcamp);

router
  .route("/:id")
  .get(bootcampController.getBootcamp)
  .put(bootcampController.updateBootcamp)
  .delete(bootcampController.deleteBootcamp);

module.exports = router;
