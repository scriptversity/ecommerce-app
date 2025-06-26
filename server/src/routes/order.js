const express = require("express");
const router = express.Router();
const { newOrder, getSingleOrder, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/new").post(isAuthenticatedUser, newOrder);
router.route("/me").get(isAuthenticatedUser, getMyOrders);
router.route("/:id").get(isAuthenticatedUser, getSingleOrder);

// Admin routes
router
  .route("/admin/all")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/:id/status")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus);

router
  .route("/admin/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
