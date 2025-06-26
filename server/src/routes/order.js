const express = require("express");
const router = express.Router();
const { newOrder, getSingleOrder, getMyOrders, getAllOrders  } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/new").post(isAuthenticatedUser, newOrder);
router.route("/me").get(isAuthenticatedUser, getMyOrders);
router.route("/:id").get(isAuthenticatedUser, getSingleOrder);

// Admin routes
router
  .route("/admin/all")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

module.exports = router;
