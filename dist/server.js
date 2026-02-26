"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./database/db");
const index_1 = __importDefault(require("./routes/index"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const db_2 = require("./database/db");
const config_1 = require("./config/config");
const globalError_middleware_1 = require("./middlewares/globalError.middleware");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(
  (0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
app.use(express_1.default.json());
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    services: {
      server: "up",
      database: (0, db_2.dbStatus)(),
    },
  });
});
app.use("/api", index_1.default);
app.use(globalError_middleware_1.notFoundHandler);
app.use(globalError_middleware_1.errorHandler);
app.listen(config_1.config.port, () => {
  console.log(" running at port ", config_1.config.port);
  (0, db_1.connectDb)();
});
exports.default = app;
