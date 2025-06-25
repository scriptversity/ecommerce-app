const express = require("express");
const {
  getUserProfile,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetails,
  updateUserDetails,
  deleteUser,
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
// Route to get user details (admin only)
router
  .route("/admin/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails);
// Route to update user details (admin only)
router
  .route("/admin/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserDetails);
// Route to delete user (admin only)
router
  .route("/admin/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
