const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/product");

// Create new review => POST /api/v1/reviews/new
// Access: Private
const createProductReview = catchAsyncErrors(async (req, res) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(201).json({
    success: true,
    message: "Review created successfully",
  });
});

// Get product reviews => GET /api/v1/reviews
const getProductReviews = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Product Review => DELETE /api/v1/reviews
const deleteProductReview = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.reviewId.toString()
  );

  const numOfReviews = reviews.length;
  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

module.exports = {
  createProductReview,
  getProductReviews,
  deleteProductReview,
};
