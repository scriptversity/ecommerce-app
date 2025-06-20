const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.route('/all').get(productController.getProducts);
// Route to create a new product
router.route('/new').post(productController.newProduct);
// Route to get a single product by ID
router.route('/:id').get(productController.getSingleProduct);

module.exports = router;
