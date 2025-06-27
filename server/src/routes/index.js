const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const userRoutes = require("./user");
const productRoutes = require("./product");
const orderRoutes = require("./order");
const reviewRoutes = require("./review");

// later we can transform this into a controller if it grows larger for example general.js for gerneral routes
// or we can keep it as is for simplicity
// This is the root route for the API, providing basic information about the API
// It can be used to check if the API is running and to provide basic metadata about the
// API such as name, version, and description.
// This route can be accessed at /api/v1/
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Shopit API",
    status: "success",
    data: {
      name: "Shopit API",
      version: "1.0.0",
      description: "A simple e-commerce API built with Express.js",
    },
  });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
