import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../lib/jwt";
import { errorResponse } from "../utils/Response";
import { findUserById } from "../services/user.services";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return errorResponse(res, 401, "Access denied");
  try {
    const decoded = verifyJwtToken(token);
    const user = await findUserById(decoded.userId);
    if (!user) return errorResponse(res, 401, "user not found");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return errorResponse(res, 401, "Invalid token");
  }
};
