import { z, ZodError } from "zod";
import { STATUS, PAYMENT_STATUS } from "../models/order.model";
import { NextFunction, Request, Response } from "express";
import { errorResponse, response } from "../utils/Response";


const orderItemSchema = z.object({
  itemId: z.string().min(1, "Invalid ObjectId"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be positive"),
});

export const createOrderSchema = z.object({
  user: z.string().min(1, "Invalid ObjectId"),
  restaurant: z.string().min(1, "Invalid ObjectId"),
  items: z.array(orderItemSchema).min(1, "Order must contain at least one item"),

  totalAmount: z.number().optional(),
  status: z.enum(STATUS).optional(),
  paymentStatus: z.enum(PAYMENT_STATUS).optional(),
  createdAt: z.date().optional(),
});

export const validateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedData = createOrderSchema.parse(req.body);
    req.body = parsedData;
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errors: Record<string, string> = {};

      err.issues.forEach((issue) => {
        const path = issue.path.join(".");
        errors[path] = `Invalid input: ${issue.message}`;
      });
      return response(res,400,"Validation Failed",errors)

    }

    return errorResponse(res, 500, "Internal Server Error");
  }
};