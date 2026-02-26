"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
const promises_1 = __importDefault(require("fs/promises"));
const config_1 = require("../config/config");
cloudinary_1.v2.config({
  cloud_name: config_1.config.cloud_name,
  api_key: config_1.config.api_key,
  api_secret: config_1.config.api_secret,
});
const uploadImage = async (file, folder = "uploads") => {
  try {
    const result = await cloudinary_1.v2.uploader.upload(file.path, {
      folder,
      resource_type: "auto",
    });
    await promises_1.default.unlink(file.path);
    return result;
  } catch (error) {
    await promises_1.default.unlink(file.path).catch(() => {});
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};
exports.uploadImage = uploadImage;
const uploadImages = async (files, folder = "uploads") => {
  try {
    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary_1.v2.uploader.upload(file.path, {
          folder,
          resource_type: "auto",
        });
        await promises_1.default.unlink(file.path);
        return result;
      }),
    );
    return uploadResults;
  } catch (error) {
    await Promise.all(
      files.map((file) => promises_1.default.unlink(file.path).catch(() => {})),
    );
    console.error("Cloudinary Multiple Upload Error:", error);
    throw error;
  }
};
exports.uploadImages = uploadImages;
