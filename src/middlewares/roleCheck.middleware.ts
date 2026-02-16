import { NextFunction } from "express";

export const checkRole = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
};
