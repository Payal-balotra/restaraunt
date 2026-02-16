import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";

export const tokenGeneration = (user: any) => {
 const token =  jwt.sign({ userId: user._id, role: user.role }, config.secretKey, {
    expiresIn: "1h",
  });
  return token;
};

export const verifyJwtToken = (token : string) => {
  const decoded = jwt.verify(token, config.secretKey) as JwtPayload
  return decoded ;
};
