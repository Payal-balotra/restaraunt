"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = void 0;
const zod_1 = require("zod");
exports.configSchema = zod_1.z.object({
  PORT: zod_1.z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val), {
      message: "PORT must be a valid number",
    }),
  MONGO_URI: zod_1.z.string().min(1, "MONGO_URI is required"),
  SECRET_KEY: zod_1.z
    .string()
    .min(10, "SECRET_KEY must be at least 10 characters"),
  REFRESH_SECRET_KEY: zod_1.z
    .string()
    .min(10, "REFRESH_SECRET_KEY must be at least 10 characters"),
  CLOUD_NAME: zod_1.z.string().min(1, "CLOUD_NAME is required"),
  API_KEY: zod_1.z.string().min(1, "API_KEY is required"),
  API_SECRET: zod_1.z.string().min(1, "API_SECRET is required"),
});
