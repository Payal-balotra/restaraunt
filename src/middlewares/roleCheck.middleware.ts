import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/Response";

export const allowRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return errorResponse(res, 403, "Acces denied");
    }
    next();
  };
};
