"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRestaurant = exports.restaurantSchema = void 0;
const zod_1 = require("zod");
const Response_1 = require("../utils/Response");
exports.restaurantSchema = zod_1.z.object({
  name: zod_1.z
    .string({ message: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters"),
  description: zod_1.z
    .string()
    .trim()
    .min(10, "Description should be a bit more detailed (min 10 chars)"),
  cuisine: zod_1.z
    .string({ message: "Please provide cuisine" })
    .nonempty("At least one cuisine type is required"),
  images: zod_1.z
    .array(zod_1.z.string().url("Each image must be a valid URL"))
    .nonempty("At least one image is required"),
  owner: zod_1.z.string().nonempty("Owner required"),
  address: zod_1.z
    .string()
    .trim()
    .min(5, "Please provide a full address")
    .nonempty("Adddress is required"),
});
const validateRestaurant = async (req, res, next) => {
  try {
    const parsedData = exports.restaurantSchema.parse(req.body);
    req.body = parsedData;
    next();
  } catch (err) {
    if (err instanceof zod_1.ZodError) {
      const errors = {};
      err.issues.forEach((issue) => {
        const path = issue.path.join(".");
        errors[path] = issue.message;
      });
      return (0, Response_1.response)(res, 400, "Validation failed", errors);
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.validateRestaurant = validateRestaurant;
