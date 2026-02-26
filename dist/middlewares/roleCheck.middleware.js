"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowRoles = void 0;
const Response_1 = require("../utils/Response");
const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return (0, Response_1.errorResponse)(res, 403, "Acces denied");
    }
    next();
  };
};
exports.allowRoles = allowRoles;
