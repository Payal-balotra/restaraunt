import { NextFunction, Request, Response } from "express";

export default function catchAsync(fn: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
