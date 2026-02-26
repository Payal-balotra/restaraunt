"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../../controllers/user.controller");
const user_validation_1 = require("../../validations/user.validation");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const roleCheck_middleware_1 = require("../../middlewares/roleCheck.middleware");
const userCheckForUpdate_middleware_1 = require("../../middlewares/userCheckForUpdate.middleware");
const user_model_1 = require("../../models/user.model");
const router = express_1.default.Router();
router.post(
  "/register",
  user_validation_1.validationMiddleware,
  user_controller_1.register,
);
router.post("/login", user_controller_1.login);
router.put(
  "/update-user/:id",
  auth_middleware_1.verifyToken,
  userCheckForUpdate_middleware_1.userIdCheck,
  user_controller_1.updateUser,
);
router.post(
  "/create-admin",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.SUPER_ADMIN),
  user_validation_1.validationMiddleware,
  user_controller_1.register,
);
router.post("/refresh-token", user_controller_1.refreshToken);
exports.default = router;
