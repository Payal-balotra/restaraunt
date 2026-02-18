import { NextFunction, Request, Response } from "express";
import { uploadImages } from "../utils/cloudinary";

export const cloudinaryUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    return next();
  }
  const responses = await uploadImages(files);
 req.body.images = responses?.map(r => r.secure_url);

  next();
};
  