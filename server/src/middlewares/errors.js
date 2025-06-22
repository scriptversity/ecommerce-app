const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  // Default fallback values
  err.statusCode = err.statusCode || 500;
  const env = process.env.NODE_ENV || 'PRODUCTION';

  // Log the error consistently
  console.error(`[${env}] ${req.method} ${req.originalUrl} → ${err.message}`);

  // DEVELOPMENT: Show detailed debug info
  if (env === 'DEVELOPMENT') {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack
    });
  }

  // PRODUCTION: Provide safe, user-facing error message
  let error = { ...err };
  error.message = err.message;

  // Mongoose: invalid ObjectId
  if (err.name === 'CastError') {
    error = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400);
  }

  // Mongoose: duplicate key
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue)[0];
    error = new ErrorHandler(`Duplicate field entered: ${duplicateField}`, 400);
  }

  // Mongoose: validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message).join(', ');
    error = new ErrorHandler(messages, 400);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message || 'Something went wrong!'
  });
};

