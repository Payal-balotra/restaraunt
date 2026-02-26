"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken =
  exports.verifyJwtToken =
  exports.generateRefreshToken =
  exports.generateAccessToken =
    void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generateAccessToken = (userId, role) => {
  const token = jsonwebtoken_1.default.sign(
    { userId, role },
    config_1.config.secretKey,
    {
      expiresIn: "1h",
    },
  );
  return token;
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId, role) => {
  return jsonwebtoken_1.default.sign(
    { userId, role },
    config_1.config.refreshToken,
    {
      expiresIn: "7d",
    },
  );
};
exports.generateRefreshToken = generateRefreshToken;
const verifyJwtToken = (token) => {
  const decoded = jsonwebtoken_1.default.verify(
    token,
    config_1.config.secretKey,
  );
  return decoded;
};
exports.verifyJwtToken = verifyJwtToken;
const verifyRefreshToken = (token) => {
  const decoded = jsonwebtoken_1.default.verify(
    token,
    config_1.config.refreshToken,
  );
  return decoded;
};
exports.verifyRefreshToken = verifyRefreshToken;
