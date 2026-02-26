"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = exports.cloudinaryUploads = void 0;
const cloudinary_1 = require("../utils/cloudinary");
const cloudinaryUploads = async (req, res, next) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return next();
  }
  const responses = await (0, cloudinary_1.uploadImages)(files);
  req.body.images = responses?.map((r) => r.secure_url);
  next();
};
exports.cloudinaryUploads = cloudinaryUploads;
const cloudinaryUpload = async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next();
  }
  const response = await (0, cloudinary_1.uploadImage)(file);
  req.body.image = response.secure_url;
  next();
};
exports.cloudinaryUpload = cloudinaryUpload;
