import { User } from "../models/user.model";

export const findUser = async (param: any) => {
  const existingUser = User.findOne({ param });
  return existingUser;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
  phone: any,
) => {
  const user = User.create({
    name,
    email,
    password,
    role,
    phone,
  });
  console.log("user created ");
  return user;
};
