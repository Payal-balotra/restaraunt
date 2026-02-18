import { NextFunction, Request, Response } from "express";
import { uploadImage, uploadImages } from "../utils/cloudinary";

export const cloudinaryUploads = async (
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

export const cloudinaryUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const file = req.file as Express.Multer.File;
  if (!file) {
    return next();
  }
  const response = await uploadImage(file);
 req.body.image = response.secure_url;
  next();
};
  