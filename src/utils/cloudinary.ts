import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

export const uploadImages = async (files: Express.Multer.File[]) => {
  try {
    const uploadPromises = files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "restaurants",
      });

      await fs.unlink(file.path);

      return result;
    });

    return await Promise.all(uploadPromises);
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    throw err;
  }
};
