const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.route('/all').get(productController.getProducts);
// Route to get a single product by ID
router.route('/admin/get/:id').get(productController.getSingleProduct);
// Route to create a new product
router.route('/new').post(productController.newProduct);
// Route to update a single product by ID
router.route('/admin/update/:id').put(productController.updateProduct)

module.exports = router;
