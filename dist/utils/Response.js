"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.response = void 0;
const response = (
  res,
  statusCode,
  message,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data,
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    data: data || [],
  });
};
exports.response = response;
const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};
exports.errorResponse = errorResponse;
