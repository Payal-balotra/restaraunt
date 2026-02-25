import mongoose from "mongoose";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { config } from "../config/config";

const createSuperAdmin = async () => {
  await mongoose.connect(config.mongoUri);
  const exsitingSuperAdmin = await User.findOne({ role: "super_admin" });
  if (exsitingSuperAdmin) {
    console.log("super admin already exist");
    return;
  }

  const hashedPassword = await bcrypt.hash("superadmin234", 10);

  const superAdmin = await User.create({
    name: "Payal",
    email: "payalackerman@gmail.com",
    password: hashedPassword,
    role: "super_admin",
    phone: 9213487342,
    isActive : true
  });

  console.log("Super Admin created", superAdmin);
};

createSuperAdmin();