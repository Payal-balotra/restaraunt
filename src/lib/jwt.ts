import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";

export const generateAccessToken = (user: any) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    config.secretKey,
    {
      expiresIn: "1h",
    },
  );
  return token;
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign({ userId: user._id, role: user.role }, config.refreshToken, {
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
