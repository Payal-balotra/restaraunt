import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";
import { Role } from "../models/user.model";

export const generateAccessToken = (userId: string, role: Role) => {
  const token = jwt.sign({ userId, role }, config.secretKey, {
    expiresIn: "1h",
  });
  return token;
};

export const generateRefreshToken = (userId: string, role: Role) => {
  return jwt.sign({ userId, role }, config.refreshToken, {
    expiresIn: "7d",
  });
};

export const verifyJwtToken = (token: string) => {
  const decoded = jwt.verify(token, config.secretKey) as JwtPayload;
  return decoded;
};
export const verifyRefreshToken = (token: string) => {
  const decoded = jwt.verify(token, config.refreshToken) as JwtPayload;
  return decoded;
};
