"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error,
  req,
  res,
) => {
  console.log("inside global error handler");
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.log(statusCode);
  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};
exports.errorHandler = errorHandler;
