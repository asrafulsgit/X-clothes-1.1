const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific Mongoose errors
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid resource ID';
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
    return res.status(statusCode).json({
      success: false,
      error: err,
      message,
      stack: err.stack,
    });
  }

  // In production, do not expose stack traces
  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
