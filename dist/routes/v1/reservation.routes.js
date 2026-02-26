"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservation_controller_1 = require("../../controllers/reservation.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const roleCheck_middleware_1 = require("../../middlewares/roleCheck.middleware");
const user_model_1 = require("../../models/user.model");
const router = express_1.default.Router();
router.post(
  "/request",
  auth_middleware_1.verifyToken,
  reservation_controller_1.reservation,
);
router.post(
  "/confirmed/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  reservation_controller_1.confirmReservation,
);
router.post(
  "/cancel/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  reservation_controller_1.cancelReservation,
);
router.post(
  "/completed/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  reservation_controller_1.completedReservation,
);
exports.default = router;
