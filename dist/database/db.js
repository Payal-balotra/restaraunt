"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbStatus = exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
const connectDb = async () => {
  try {
    await mongoose_1.default.connect(config_1.config.mongoUri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("MongoDB Connection error", err);
  }
};
exports.connectDb = connectDb;
const dbStatus = () => {
  return mongoose_1.default.connection.readyState === 1
    ? "connected"
    : "disconnected";
};
exports.dbStatus = dbStatus;
