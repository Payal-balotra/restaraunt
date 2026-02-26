import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { errorResponse, response } from "../utils/Response";
import { Types } from "mongoose";

export const reviewSchema = z.object({
  restaurant: z.string().refine(
    (val) => {
      return Types.ObjectId.isValid(val);
    },
    {
      message: "Invalid ObjectId",
    },
  ),
  rating: z
    .number({ message: "Please provide valid rating between 1 to 5 " })
    .min(1, { message: "minimum rating should be 1" })
    .max(5, { message: "Maximun rating can be 5 " }),
  comment: z
    .string({ message: "please provide valid review" })
    .max(150, { message: "maximun length for review is 150" }),
});

export const validateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedData = reviewSchema.parse(req.body);
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
