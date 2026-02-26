"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt_1 = require("../lib/jwt");
const Response_1 = require("../utils/Response");
const user_services_1 = require("../services/user.services");
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return (0, Response_1.errorResponse)(res, 401, "Access denied");
  try {
    const decoded = (0, jwt_1.verifyJwtToken)(token);
    const user = await (0, user_services_1.findUserById)(decoded.userId);
    if (!user) return (0, Response_1.errorResponse)(res, 401, "user not found");
    if (!user.isActive)
      return (0, Response_1.errorResponse)(res, 401, "Admin Blocks the user");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return (0, Response_1.errorResponse)(res, 401, "Invalid token");
  }
};
exports.verifyToken = verifyToken;
