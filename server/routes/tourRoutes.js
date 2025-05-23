const express = require("express");

const tourController = require("./../controllers/tourController");
const authController = require("./../controllers/authController");
const reviewRouter = require("./../routes/reviewRoutes");

const router = express.Router();

router.use("/:tourId/reviews", reviewRouter);

// router.use(authController.isLoggedIn);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.createTour
  );

router.route("/tour/:slug").get(tourController.getTourByslug);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );

module.exports = router;
