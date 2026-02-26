import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { response } from "../utils/Response";
import { Types } from "mongoose";

export const reservationSchema = z.object({
  restaurant: z.string().refine(
    (val) => {
      return Types.ObjectId.isValid(val);
    },
    {
      message: "Invalid ObjectId",
    },
  ),
  date: z.string().date({ message: "Provide valid date" }),

  time: z.string().time({ message: "Please provide valid time" }),

  guests: z
    .number({ message: "Please provide valid guests number" })
    .min(1, { message: "Atleast 1 guest is necessary" }),
});

export const validateReservation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedData = reservationSchema.parse(req.body);
    req.body = parsedData;
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errors: Record<string, string> = {};

      err.issues.forEach((issue) => {
        const path = issue.path.join(".");
        errors[path] = issue.message;
      });

      return response(res, 400, "Validation failed", errors);
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
