"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const roleCheck_middleware_1 = require("../../middlewares/roleCheck.middleware");
const user_model_1 = require("../../models/user.model");
const admin_controller_1 = require("../../controllers/admin.controller");
const router = (0, express_1.Router)();
router.post(
  "/inactive-user/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.ADMIN),
  admin_controller_1.inActiveUser,
);
router.get(
  "/total-restaurants",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.ADMIN),
  admin_controller_1.totalRestaurant,
);
router.get(
  "/menu-itmes/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.ADMIN),
  admin_controller_1.itemsPerRestaurant,
);
// router.get("/reservations",verifyToken,allowRoles(Role.ADMIN))
router.get(
  "/customers",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.ADMIN),
  admin_controller_1.customers,
);
router.get(
  "/owners",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.ADMIN),
  admin_controller_1.owners,
);
router.get(
  "/capacity",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.ADMIN),
  admin_controller_1.capacity,
);
router.get(
  "/users-orders-per-restaurant/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.ADMIN),
);
exports.default = router;
