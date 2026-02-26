"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const order_controller_1 = require("../../controllers/order.controller");
// import { validateOrder } from "../../validations/order.validation";
const roleCheck_middleware_1 = require("../../middlewares/roleCheck.middleware");
const user_model_1 = require("../../models/user.model");
const router = express_1.default.Router();
router.post(
  "/place-order",
  auth_middleware_1.verifyToken,
  order_controller_1.placeOrder,
);
router.post(
  "/accept-order/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  order_controller_1.acceptOrder,
);
router.post(
  "/prepare-order/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  order_controller_1.prepareOrder,
);
router.post(
  "/outForDelivery-order/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  order_controller_1.outForDelivery,
);
router.post(
  "/completed-order/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  order_controller_1.completedOrder,
);
router.post(
  "/cancel-order/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  order_controller_1.cancelOrder,
);
exports.default = router;
