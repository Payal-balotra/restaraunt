"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMenuItems = exports.menuItemSchema = void 0;
const zod_1 = require("zod");
const Response_1 = require("../utils/Response");
exports.menuItemSchema = zod_1.z.object({
  name: zod_1.z
    .string({ message: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters"),
  price: zod_1.z.coerce
    .number()
    .positive("Price must be a positive number")
    .multipleOf(0.01, "Price cannot have more than 2 decimal places"),
  category: zod_1.z.string({ message: "Please provide category of food" }),
  image: zod_1.z
    .string({ message: "Provide image of food" })
    .url("Each image must be a valid URL"),
  restaurant: zod_1.z
    .string({ message: "Please provide Restaurant Id" })
    .trim()
    .min(1, "Restaurant required"),
  isAvailable: zod_1.z.coerce
    .boolean({ message: "isAvailable must be a boolean" })
    .default(true),
});
const validateMenuItems = async (req, res, next) => {
  try {
    const parsedData = exports.menuItemSchema.parse(req.body);
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
exports.validateMenuItems = validateMenuItems;
