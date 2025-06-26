const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create new order => POST /api/v1/orders/new
const newOrder = catchAsyncErrors(async (req, res, next) => {
  const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id
  });

  res.status(201).json({
    success: true,
    order
  });
});

// Get single order details => GET /api/v1/orders/:id
const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order
  });
});

// Get all orders for a user => GET /api/v1/orders/me
const getMyOrders = catchAsyncErrors(async (req, res, next) => {
  console.log(req.user);
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders
  });
});

// Get all orders (Admin) => GET /api/v1/orders/admin/all
const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");

  let totalAmount = 0;
  orders.forEach(order => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders
  });
});

// Update order status (Admin) => PUT /api/v1/orders/admin/:id/status
const updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Order status updated successfully"
  });
});

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);
  // if (!product) {
  //   throw new ErrorHandler("Product not found", 404);
  // }
  product.stock -= quantity;
  // if (product.stock < 0) {
  //   product.stock += quantity;
  //   throw new ErrorHandler("Insufficient stock", 400);
  // }

  await product.save({ validateBeforeSave: false });
}

module.exports = {
  newOrder,
  getSingleOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
};