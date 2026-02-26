"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIdCheck = void 0;
const Response_1 = require("../utils/Response");
const userIdCheck = (req, res, next) => {
  if (req.user?.id === req.params.id || req.user?.role === "super_admin") {
    next();
  } else {
    return (0, Response_1.errorResponse)(res, 401, "Unauthorised User");
  }
};
exports.userIdCheck = userIdCheck;
