import { Request, Response } from "express";
import { createUser, findUser } from "../services/user.services";
import { comparePassword, hashPassword } from "../lib/bcrypt";
import { tokenGeneration } from "../lib/jwt";
import { response, errorResponse } from "../utils/Response";
import catchAsync from "../utils/catchAsync";

export const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, role, phone } = req.body;

  await hashPassword(password);
  const existingUser = await findUser(email);
  if (existingUser) {
    return response(res, 409, "User already exist", "");
  }

  const user = await createUser(name, email, password, role, phone);
  return response(res, 201, "User created successfully", user);
});

export const login = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const user = await findUser(email);
    if (!user) {
      return errorResponse(res, 401, "Authentication failed");
    }
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return errorResponse(res, 401, "Authentication failed");
    }

    const token = tokenGeneration(user);

    res.status(200).json({ token });
  },
);
