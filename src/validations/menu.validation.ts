import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { errorResponse, response } from "../utils/Response";

export const menuItemSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters"),

  price: z.coerce
    .number()
    .positive("Price must be a positive number")
    .multipleOf(0.01, "Price cannot have more than 2 decimal places"),

  category: z.string({ message: "Please provide category of food" }),

  image: z
    .string({ message: "Provide image of food" })
    .url("Each image must be a valid URL"),

  restaurant: z
    .string({ message: "Please provide Restaurant Id" })
    .trim()
    .min(1, "Restaurant required"),

  isAvailable: z.coerce
    .boolean({ message: "isAvailable must be a boolean" })
    .default(true),
});

export const validateMenuItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedData = menuItemSchema.parse(req.body);
    req.body = parsedData;
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err);

      const errors: Record<string, string> = {};

      err.issues.forEach((issue) => {
        const path = issue.path.join(".");
        errors[path] = issue.message;
      });

      return response(res, 400, "Validation failed", errors);
    }
    return errorResponse(res, 500, "Internal Server Error");
  }
};
