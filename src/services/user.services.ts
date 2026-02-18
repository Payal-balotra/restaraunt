import { User } from "../models/user.model";
export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
  phone: number,
) => {
  const user = User.create({ name, email, password, role, phone });
  console.log("user created ");
  return user;
};

export const findUserByEmail = async (email: string) => {
  const existingUser = User.findOne({ email });
  return existingUser;
};
export const findUserById = async (id: number) => {
  const existingUser = User.findById(id);
  return existingUser;
};
export const findUserByName = async (name: string) => {
  const existingUser = User.findOne({ name });
  return existingUser;
};


export const updateUserById = async (userId: string, data: any) => {
  const updatedUser = User.findByIdAndUpdate(userId, data, { returnDocument: 'after' });
  return updatedUser;
};
