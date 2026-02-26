"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const createSuperAdmin = async () => {
  await mongoose_1.default.connect(config_1.config.mongoUri);
  const exsitingSuperAdmin = await user_model_1.User.findOne({
    role: "super_admin",
  });
  if (exsitingSuperAdmin) {
    console.log("super admin already exist");
    return;
  }
  const hashedPassword = await bcrypt_1.default.hash("superadmin234", 10);
  const superAdmin = await user_model_1.User.create({
    name: "Payal",
    email: "payalackerman@gmail.com",
    password: hashedPassword,
    role: "super_admin",
    phone: 9213487342,
    isActive: true,
  });
  console.log("Super Admin created", superAdmin);
};
createSuperAdmin();
