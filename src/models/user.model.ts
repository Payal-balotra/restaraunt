import mongoose from "mongoose";

export enum Role {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  RESTARAUNT_OWNER = 'restaraunt_owner'
}

const userSchema = new mongoose.Schema({
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
    enum :Object.values(Role),
    default : Role.CUSTOMER,
    required: true,
  },
  phone: {
    type: Number,
  },
},{timestamps:true});

export const User = mongoose.model("User", userSchema);
