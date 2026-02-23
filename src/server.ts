import express from "express";
import { connectDb } from "./database/db";
import routes from "./routes/index";
import helmet from "helmet";
import cors from "cors";
import { dbStatus } from "./database/db";
import { config } from "./config/config";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/globalError.middleware";
const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    services: {
      server: "up",
      database: dbStatus(),
    },
  });
});

app.use("/api", routes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(" running at port ", config.port);
  connectDb();
});

export default app;
