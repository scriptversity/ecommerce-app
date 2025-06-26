const express = require("express");
const router = express.Router();
const { newOrder, getSingleOrder, getMyOrders  } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/new").post(isAuthenticatedUser, newOrder);
router.route("/me").get(isAuthenticatedUser, getMyOrders);
router.route("/:id").get(isAuthenticatedUser, getSingleOrder);

module.exports = router;
