"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCartItems =
  exports.cartZodSchema =
  exports.cartItemZodSchema =
    void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const Response_1 = require("../utils/Response");
const objectIdSchema = zod_1.z
  .string()
  .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });
exports.cartItemZodSchema = zod_1.z.object({
  menuItem: objectIdSchema,
  quantity: zod_1.z
    .number("Please provide valid cart quantity ")
    .min(1, "Cart item can't be less than 1"),
});
exports.cartZodSchema = zod_1.z.object({
  restaurant: objectIdSchema,
  items: zod_1.z.array(exports.cartItemZodSchema),
});
const validateCartItems = async (req, res, next) => {
  try {
    const parsedData = exports.cartZodSchema.parse(req.body);
    req.body = parsedData;
    next();
  } catch (err) {
    if (err instanceof zod_1.ZodError) {
      console.log(err);
      const errors = {};
      err.issues.forEach((issue) => {
        const path = issue.path.join(".");
        errors[path] = issue.message;
      });
      return (0, Response_1.response)(res, 400, "Validation failed", errors);
    }
    return (0, Response_1.errorResponse)(res, 500, "Internal Server Error");
  }
};
exports.validateCartItems = validateCartItems;
