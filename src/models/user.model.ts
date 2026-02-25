import mongoose from "mongoose";

export enum Role {
  ADMIN = "admin",
  CUSTOMER = "customer",
  RESTAURANT_OWNER = "restaurant_owner",
  SUPER_ADMIN = "super_admin",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  phone: number;
  isActive: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.CUSTOMER,
      required: true,
      immutable: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", userSchema);
