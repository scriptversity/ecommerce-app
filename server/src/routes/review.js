const express = require("express");
const router = express.Router();

const {
  createProductReview,
  getProductReviews,
  deleteProductReview,
} = require("../controllers/reviewController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/").get(getProductReviews);

router.route("/new").put(isAuthenticatedUser, createProductReview);

router.route("/").delete(isAuthenticatedUser, deleteProductReview);

module.exports = router;
