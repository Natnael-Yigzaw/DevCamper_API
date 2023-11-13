const express = require("express");
const router = express.Router({ mergeParams: true });
const courseController = require("../controllers/courseCtrl");
const Course = require("../models/course");
const advancedResults = require("../middleware/advancedResults");

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
  .post(courseController.addCourse);

// Routes for handling individual courses by ID
router
  .route("/:id")
  .get(courseController.getCourse)
  .put(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = router;
