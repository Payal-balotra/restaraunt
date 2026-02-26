"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrder = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
const order_model_1 = require("../models/order.model");
const Response_1 = require("../utils/Response");
const orderItemSchema = zod_1.z.object({
  itemId: zod_1.z.string().min(1, "Invalid ObjectId"),
  quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
  price: zod_1.z.number().min(0, "Price must be positive"),
});
exports.createOrderSchema = zod_1.z.object({
  user: zod_1.z.string().min(1, "Invalid ObjectId"),
  restaurant: zod_1.z.string().min(1, "Invalid ObjectId"),
  items: zod_1.z
    .array(orderItemSchema)
    .min(1, "Order must contain at least one item"),
  totalAmount: zod_1.z.number().optional(),
  status: zod_1.z.enum(order_model_1.STATUS).optional(),
  paymentStatus: zod_1.z.enum(order_model_1.PAYMENT_STATUS).optional(),
  createdAt: zod_1.z.date().optional(),
});
const validateOrder = async (req, res, next) => {
  try {
    const parsedData = exports.createOrderSchema.parse(req.body);
    req.body = parsedData;
    next();
  } catch (err) {
    if (err instanceof zod_1.ZodError) {
      const errors = {};
      err.issues.forEach((issue) => {
        const path = issue.path.join(".");
        errors[path] = `Invalid input: ${issue.message}`;
      });
      return (0, Response_1.response)(res, 400, "Validation Failed", errors);
    }
    return (0, Response_1.errorResponse)(res, 500, "Internal Server Error");
  }
};
exports.validateOrder = validateOrder;
