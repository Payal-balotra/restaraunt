"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = exports.roles = void 0;
const zod_1 = __importDefault(require("zod"));
const zod_2 = require("zod");
const user_model_1 = require("../models/user.model");
const Response_1 = require("../utils/Response");
exports.roles = zod_1.default.enum(Object.values(user_model_1.Role), {
  message: "Please enter valid role .",
});
const userSchema = zod_1.default.object({
  name: zod_1.default
    .string({})
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(20, { message: "Username length exceeds by 20 chracters " }),
  email: zod_1.default.string(),
  password: zod_1.default
    .string()
    .min(8, "password atleast 8 charcter long")
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password,
        ),
      {
        message:
          "password atleast conatin on uppercase , lowercase , digit , and a special character",
      },
    ),
  role: exports.roles,
  phone: zod_1.default.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
});
const validationMiddleware = (req, res, next) => {
  try {
    const parsedData = userSchema.parse(req.body);
    req.body = parsedData;
    next();
  } catch (err) {
    if (err instanceof zod_2.ZodError) {
      const errors = {};
      err.issues.forEach((issue) => {
        const path = issue.path.join(".");
        errors[path] = issue.message;
      });
      return (0, Response_1.response)(res, 400, "Validation failed", errors);
    }
  }
};
exports.validationMiddleware = validationMiddleware;
