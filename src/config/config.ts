import dotenv from "dotenv";
import { configSchema } from "../validations/config.validation";
dotenv.config();

interface Config {
  port: number;
  mongoUri: string;
  secretKey: string;
  refreshToken : string;
  cloud_name : string;
  api_key : string;
  api_secret :string;
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
  refreshToken: String(process.env.REFRESH_SECRET_KEY),
  cloud_name: String(process.env.CLOUD_NAME),
  api_key:String( process.env.API_KEY),
  api_secret: String(process.env.API_SECRET),
};
