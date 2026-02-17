import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../lib/jwt";
import { errorResponse } from "../utils/Response";
import { findUserById } from "../services/user.services";

export const getUser = async (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) return errorResponse(res, 401, "Access denied");
  try {
    const decoded = verifyJwtToken(token);
    const user = await findUserById(decoded.userId);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return errorResponse(res, 401, "Invalid token");
  }
};
