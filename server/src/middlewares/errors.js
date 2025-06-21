const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // // Log the error for debugging
  // console.error(err);

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

  res.status(err.statusCode).json({
    success: false,
    error: err.stack || err.message,
    // stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
}
