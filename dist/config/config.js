"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const config_validation_1 = require("../validations/config.validation");
dotenv_1.default.config();
const parsedData = config_validation_1.configSchema.safeParse(process.env);
// console.log(parsedData);
if (!parsedData.success) {
  console.error(" Invalid environment variables:");
  console.error(parsedData.error.format());
  process.exit(1);
}
exports.config = {
  port: Number(process.env.PORT),
  mongoUri: String(process.env.MONGO_URI),
  secretKey: String(process.env.SECRET_KEY),
  refreshToken: String(process.env.REFRESH_SECRET_KEY),
  cloud_name: String(process.env.CLOUD_NAME),
  api_key: String(process.env.API_KEY),
  api_secret: String(process.env.API_SECRET),
};
