const express = require("express");
const router = express.Router({ mergeParams: true });
const courseController = require("../controllers/courseCtrl");
const Course = require("../models/course");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Route for handling courses
router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    courseController.getCourses
  )
  .post(protect, authorize("publisher", "admin"), courseController.addCourse);

// Routes for handling individual courses by ID
router
  .route("/:id")
  .get(courseController.getCourse)
  .put(protect, authorize("publisher", "admin"), courseController.updateCourse)
  .delete(
    protect,
    authorize("publisher", "admin"),
    courseController.deleteCourse
  );

module.exports = router;
