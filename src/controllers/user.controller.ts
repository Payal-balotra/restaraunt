import { Request, Response } from "express";
import {
  createUser,
  findUserByEmail,
  updateUserById,
} from "../services/user.services";
import { comparePassword, hashPassword } from "../lib/bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../lib/jwt";
import { response, errorResponse } from "../utils/Response";
import catchAsync from "../utils/catchAsync";

export const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, role, phone } = req.body;
  const hashedPassword = await hashPassword(password);
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return response(res, 409, "User already exist", "");
  }

  const user = await createUser(name, email, hashedPassword, role, phone);
  return response(res, 201, "User created successfully", user);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return errorResponse(res, 401, "Authentication failed");
  }

  const passwordMatch = comparePassword(password, user.password);
  if (!passwordMatch) {
    return errorResponse(res, 401, "Authentication failed");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.status(200).json({ accessToken, refreshToken });
});

export const updateUser = catchAsync(async (req: any, res: Response) => {
  const data = req.body;
  const userId = req.params.id;
  const updatedUser = await updateUserById(userId, data);
  return response(res, 200, "User Updated Successfully", updatedUser);
})

export const refreshToken = (req: any, res: Response) => {
  const token = req.header("Authorization");
  if (!token) {
    return errorResponse(
      res,
      401,
      "Please provide Refresh Token to get access token",
    );
  }

  const user = verifyRefreshToken(token);
  if (!user) {
    return errorResponse(res, 401, "Invalid Refersh Token");
  }
  const accessToken = generateAccessToken({ user });
  return response(res, 200, "Refresh Token", accessToken);
};
