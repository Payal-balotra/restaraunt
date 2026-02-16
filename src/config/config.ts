import dotenv from "dotenv";
import { configSchema } from "../validations/config.validation";
dotenv.config();

interface Config {
  port: number;
  mongoUri: string;
  secretKey: string;
}

const parsedData = configSchema.safeParse(process.env);
// console.log(parsedData);
if (!parsedData.success) {
  console.error(" Invalid environment variables:");
  
  console.error(parsedData.error.format());
  process.exit(1);
}

export const config: Config = {
  port: Number(process.env.PORT),
  mongoUri: String(process.env.MONGO_URI),
  secretKey: String(process.env.SECRET_KEY),
};
