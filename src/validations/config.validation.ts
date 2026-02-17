import { z } from "zod";

export const configSchema = z.object({
  PORT: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val), {
      message: "PORT must be a valid number",
    }),

  MONGO_URI: z.string().min(1, "MONGO_URI is required"),

  SECRET_KEY: z.string().min(10, "SECRET_KEY must be at least 10 characters"),
});
