const express = require("express");
const router = express.Router();

const { createProductReview } = require("../controllers/reviewController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/new").put(isAuthenticatedUser, createProductReview);

module.exports = router;
