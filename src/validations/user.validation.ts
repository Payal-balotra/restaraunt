import z from "zod";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Role } from "../models/user.model";
import { response } from "../utils/Response";

export const roles = z.enum(Object.values(Role), {
  message: "Please enter valid role .",
});
const userSchema = z.object({
  name: z
    .string({ message: "Name is Required" })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(20, { message: "Username length exceeds by 20 chracters " }),
  email: z.string().email(),
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
  phone: z
    .string({ message: "Phone Required" })
    .regex(/^[6-9]\d{9}$/, "Invalid phone number"),
});

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedData = userSchema.parse(req.body);
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
  }
};

export const updateValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedData = userSchema.partial(req.body);
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
  }
};

const userSchemaForLogin = z.object({
  email: z.string().email(),
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
});

export const loginValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedData = userSchemaForLogin.parse(req.body);
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
  }
};
