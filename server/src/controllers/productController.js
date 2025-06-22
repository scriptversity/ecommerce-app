const Product = require('../models/Product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new product => POST /api/v1/products/admin/new
const newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  });
})

// Get all products => GET /api/v1/products/all
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  if (!products || products.length === 0) {
    return next(new ErrorHandler('No products found', 404));
  }

  res.status(200).json({
    success: true,
    products,
    count: products.length
  });
})

// Get single product details => GET /api/v1/products/get/:id
const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product
  });
})

// Update product details => PUT /api/v1/products/admin/update/:id
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    product: updatedProduct
  });
})

// Delete Product => /api/v1/products/admin/delete/:id
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product was deleted successfully"
  })
})

module.exports = {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct
};
