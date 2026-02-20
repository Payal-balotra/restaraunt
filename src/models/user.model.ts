import mongoose from "mongoose";

export enum Role {
  ADMIN = "admin",
  CUSTOMER = "customer",
  RESTAURANT_OWNER = "restaurant_owner",
  SUPER_ADMIN = "super_admin",
}

export type User = {
  name: string;
  emial: string;
  password: string;
  role: Role;
  phone: number;
};

const userSchema = new mongoose.Schema(
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
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
