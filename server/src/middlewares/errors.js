const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  // err.message = err.message || 'Internal Server Error';

  // Log the error for debugging
  console.error(err);

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    // console.error(`[Error] ${req.method} ${req.originalUrl} → ${err.message}`);
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errorMessage: err.message,
      stack: err.stack
    });
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    // Log the error for production
    // console.error(`[Error] ${req.method} ${req.originalUrl} → ${err.message}`);
    let error = { ...err }; // Create a shallow copy of the error object
    error.message = err.message; // Preserve the original message
    
    res.status(error.statusCode).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
  // // Handle specific error types
  // if (err.name === 'CastError') {
  //   const message = `Resource not found. Invalid: ${err.path}`;
  //   err = new ErrorHandler(message, 400);
  // }

  // if (err.name === 'CastError') {
  //   return next(new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400));
  // }


  // if (err.code === 11000) {
  //   const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
  //   err = new ErrorHandler(message, 400);
  // }

  // if (err.name === 'ValidationError') {
  //   const message = Object.values(err.errors).map(value => value.message).join(', ');
  //   err = new ErrorHandler(message, 400);
  // }

  // res.status(err.statusCode).json({
  //   success: false,
  //   error: err.stack || err.message,
  //   // stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  // });
}
