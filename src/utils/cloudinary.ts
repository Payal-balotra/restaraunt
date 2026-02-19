import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import { config } from "../config/config";

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

export const uploadToCloudinary = async (
  files: Express.Multer.File | Express.Multer.File[],
  folder: string
) => {
  const fileArray = Array.isArray(files) ? files : [files];

  const uploadResults = await Promise.all(
    fileArray.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder,
        resource_type: "auto",
      });

      await fs.unlink(file.path);
      return result;
    })
  );

  return Array.isArray(files) ? uploadResults : uploadResults[0];
};
