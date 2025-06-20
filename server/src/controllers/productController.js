const Product = require('../models/Product');

// Create a new product => POST /api/v1/products/admin/new
const newProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// Get all products => GET /api/v1/products/all
const getProducts = async (req, res, next) => {
  try {
    // Simulate fetching products from a database
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json({
      success: true,
      products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
}

// Get single product details => GET /api/v1/products/get/:id
const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
}

// Update product details => PUT /api/v1/products/admin/update/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      success: true,
      product: updatedProduct
    });
  }
  catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
}

// Delete Product => /api/v1/products/admin/delete/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product was deleted successfully"
    })
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
}

module.exports = {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct
};
