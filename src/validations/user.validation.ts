import z from "zod";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Role } from "../models/user.model";

export const roles = z.enum(Object.values(Role), {
  message: "Please enter valid role .",
});
const userSchema = z.object({
  name: z
    .string({})
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(20, { message: "Username length exceeds by 20 chracters " }),
  email: z.string(),
  password: z
    .string()
    .min(8, "password atleast 8 charcter long")
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password,
        ),
      {
        message:
          "password atleast conatin on uppercase , lowercase , digit , and a special character",
      },
    ),

  role: roles,
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
});

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    userSchema.parse({ ...req.body });
    next();
  } catch (err) {
    // console.log(err);
    if (err instanceof ZodError) {
      const errors: Record<string, string> = {};

      err.issues.forEach((issue) => {
        const path = issue.path.join(".");
        errors[path] = issue.message;
      });

      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }
  }
};
