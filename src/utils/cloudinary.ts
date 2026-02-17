import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config";
import fs from "fs/promises"

cloudinary.config(config.cloud_name, config.api_key,config.api_secret);
export const uploadImages = async (images: any)=>{
  try {
    for (const image in images) {
      const result = await cloudinary.uploader.upload(images[image]);
      await fs.unlink(image);
      return result;
    }
  } catch (err) {
    console.log(err)
  }
}
