const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.route('/all').get(productController.getProducts);
// Route to create a new product
router.route('/create').post(productController.newProduct);

module.exports = router;
