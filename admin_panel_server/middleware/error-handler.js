const { StatusCodes } = require('http-status-codes');
const { CustomAPIError } = require('../errors');

const errorHandlerMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Something went wrong. Please try again later.';

  if (err instanceof CustomAPIError) {
    statusCode = err.statusCode;
    message = err.message;  
  } 

  return res.status(statusCode).json({ message });
};

module.exports = errorHandlerMiddleware;
  