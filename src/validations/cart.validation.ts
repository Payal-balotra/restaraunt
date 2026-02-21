import { z, ZodError } from "zod";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { errorResponse, response } from "../utils/Response";

const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

export const cartItemZodSchema = z.object({
  menuItem: objectIdSchema,
  quantity: z.number("Please provide valid cart quantity ").min(1 , "Cart item can't be less than 1"),
});

export const cartZodSchema = z.object({
  user: objectIdSchema,
  restaurant: objectIdSchema,
  items: z.array(cartItemZodSchema),
});

export const validateCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const parsedData = cartZodSchema.parse( req.body );
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

      return response(res,400,"Validation failed",errors);
    }
    return errorResponse(res,500,"Internal Server Error")
  }
};