import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { response } from "../utils/Response";

export const restaurantSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description should be a bit more detailed (min 10 chars)"),

  cuisine: z.string({message : "Please provide cuisine"})
    .nonempty("At least one cuisine type is required"),

  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .nonempty("At least one image is required"),

  owner: z.string().nonempty("Owner required"),
  address: z
    .string()
    .trim()
    .min(5, "Please provide a full address")
    .nonempty("Adddress is required"),
});

export const validateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    restaurantSchema.parse({ ...req.body });
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
