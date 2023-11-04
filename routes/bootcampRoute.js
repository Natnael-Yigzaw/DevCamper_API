const express = require("express");
const router = express.Router();
const bootcampController = require("../controllers/bootcampCtrl");

// router.get("/");
// router.get("/:id");
// router.post("/");
// router.put("/:id");
// router.delete("/:id");

router
  .route("/")
  .get(bootcampController.getBootcamps)
  .post(bootcampController.createBootcamp);
router
  .route("/:id")
  .get(bootcampController.getBootcamp)
  .put(bootcampController.updateBootcamp)
  .delete(bootcampController.deleteBootcamp);

module.exports = router;
