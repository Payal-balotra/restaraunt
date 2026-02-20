import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import { config } from "../config/config";

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

export const uploadImage = async (
  file: Express.Multer.File,
  folder: string = "uploads",
) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder,
      resource_type: "auto",
    });

    await fs.unlink(file.path);

    return result;
  } catch (error) {
    await fs.unlink(file.path).catch(() => {});
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

export const uploadImages = async (
  files: Express.Multer.File[],
  folder: string = "uploads",
) => {
  try {
    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder,
          resource_type: "auto",
        });

        await fs.unlink(file.path);
        return result;
      }),
    );

    return uploadResults;
  } catch (error) {
    await Promise.all(
      files.map((file) => fs.unlink(file.path).catch(() => {})),
    );

    console.error("Cloudinary Multiple Upload Error:", error);
    throw error;
  }
};
