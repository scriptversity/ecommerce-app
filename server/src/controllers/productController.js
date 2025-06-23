const Product = require('../models/Product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create a new product => POST /api/v1/products/admin/new
const newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id; // Set the user ID from the authenticated user
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  });
})

// Get all products => GET /api/v1/products/all?keyword=apple&price[gte]=1&price[gte]=100&page=1&limit=10
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const resultsPerPage = 4; // Default results per page
  const totalProductsCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate(resultsPerPage);
  const products = await apiFeatures.query;
  if (!products || products.length === 0) {
    return next(new ErrorHandler('No products found', 404));
  }

  res.status(200).json({
    success: true,
    count: products.length,
    productsCount: totalProductsCount,
    products
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
