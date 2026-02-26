"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = catchAsync;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function catchAsync(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
