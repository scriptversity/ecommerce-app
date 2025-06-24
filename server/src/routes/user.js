const express = require("express");
const {
  getUserProfile,
  updatePassword,
  updateProfile,
  getAllUsers,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

// Route to get user profile
router.route("/me").get(isAuthenticatedUser, getUserProfile);
// Route to update user password
router.route("/updatepassword").put(isAuthenticatedUser, updatePassword);
// Route to update user profile
router.route("/updateprofile").put(isAuthenticatedUser, updateProfile);
// Route to get all users (admin only)
router
  .route("/admin/all")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

module.exports = router;
