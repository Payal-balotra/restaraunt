import bcrypt from "bcrypt";

export const hashPassword = (password: any) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (passwordTo: any, passwordBy: any) => {
  return await bcrypt.compare(passwordTo, passwordBy);
};
