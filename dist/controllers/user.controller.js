"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken =
  exports.updateUser =
  exports.login =
  exports.register =
    void 0;
const user_services_1 = require("../services/user.services");
const bcrypt_1 = require("../lib/bcrypt");
const jwt_1 = require("../lib/jwt");
const Response_1 = require("../utils/Response");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.register = (0, catchAsync_1.default)(async (req, res) => {
  const { name, email, password, role, phone } = req.body;
  const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
  const existingUser = await (0, user_services_1.findUserByEmail)(email);
  if (existingUser) {
    return (0, Response_1.response)(res, 409, "User already exist", "");
  }
  const user = await (0, user_services_1.createUser)(
    name,
    email,
    hashedPassword,
    role,
    phone,
  );
  return (0, Response_1.response)(res, 201, "User created successfully", user);
});
exports.login = (0, catchAsync_1.default)(async (req, res) => {
  const { email, password } = req.body;
  const user = await (0, user_services_1.findUserByEmail)(email);
  if (!user) {
    return (0, Response_1.errorResponse)(res, 401, "Authentication failed");
  }
  const passwordMatch = (0, bcrypt_1.comparePassword)(password, user.password);
  if (!passwordMatch) {
    return (0, Response_1.errorResponse)(res, 401, "Authentication failed");
  }
  const accessToken = (0, jwt_1.generateAccessToken)(user.id, user.role);
  const refreshToken = (0, jwt_1.generateRefreshToken)(user.id, user.role);
  res.status(200).json({ accessToken, refreshToken });
});
exports.updateUser = (0, catchAsync_1.default)(async (req, res) => {
  const data = req.body;
  const userId = req.params.id;
  const updatedUser = await (0, user_services_1.updateUserById)(userId, data);
  return (0, Response_1.response)(
    res,
    200,
    "User Updated Successfully",
    updatedUser,
  );
});
const refreshToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return (0, Response_1.errorResponse)(
      res,
      401,
      "Please provide Refresh Token to get access token",
    );
  }
  const user = (0, jwt_1.verifyRefreshToken)(token);
  if (!user) {
    return (0, Response_1.errorResponse)(res, 401, "Invalid Refersh Token");
  }
  const accessToken = (0, jwt_1.generateAccessToken)(user.userId, user.role);
  return (0, Response_1.response)(res, 200, "Access Token", accessToken);
};
exports.refreshToken = refreshToken;
