import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/Response";

export const userIdCheck = (req: any, res: Response, next: NextFunction) => {
  if (req.user?.id === req.params.id || req.user?.role === "super_admin") {
    next();
  } else {
    return errorResponse(res, 401, "Unauthorised User");
  }
};
