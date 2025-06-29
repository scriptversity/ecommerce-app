const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// Route to get all products
router.route('/all').get(productController.getProducts);
// Route to get a single product by ID
router.route('/get/:id').get(productController.getSingleProduct);
// Route to create a new product
router.route('/admin/new').post(isAuthenticatedUser, authorizeRoles('admin'), productController.newProduct);
// Route to update a single product by ID
router.route('/admin/update/:id').put(isAuthenticatedUser, authorizeRoles('admin'), productController.updateProduct)
// Route to delete a single product by ID
router.route('/admin/delete/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), productController.deleteProduct)

module.exports = router;
