const jwt = require('jsonwebtoken');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/user');

// Ckecks if the user is authenticated
const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new ErrorHandler('Please login to access this resource', 401));
  }

  let decodedData;
  try {
    decodedData = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new ErrorHandler('Invalid or expired token', 401));
  }

  req.user = await User.findById(decodedData.id);

  if (!req.user) {
    return next(new ErrorHandler('User not found', 404));
  }
  next();
});

// Middleware to handle users with specific roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
    }
    next();
  };
}

module.exports = { isAuthenticatedUser, authorizeRoles };

// Alternative implementation without catchAsyncErrors
// const isAuthenticatedUser = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Please login to access this resource'
//     });
//   }

//   try {
//     const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decodedData.user;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'Invalid or expired token'
//     });
//   }
// }