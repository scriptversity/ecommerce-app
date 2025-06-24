const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

// Route to get user profile
router.route("/me").get(isAuthenticatedUser, getUserProfile);

module.exports = router;
