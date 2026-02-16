import { Request, Response } from "express";

export const response = (
  res: Response,
  statusCode: number,
  message: string,
  data: any,
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    data: data || [],
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};
