"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const restaurant_route_1 = __importDefault(require("./restaurant.route"));
const menu_routes_1 = __importDefault(require("./menu.routes"));
const cart_routes_1 = __importDefault(require("./cart.routes"));
const order_routes_1 = __importDefault(require("./order.routes"));
const reservation_routes_1 = __importDefault(require("./reservation.routes"));
const review_routes_1 = __importDefault(require("./review.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use("/admin", admin_routes_1.default);
router.use("/restaurants", restaurant_route_1.default);
router.use("/menu-items", menu_routes_1.default);
router.use("/cart", cart_routes_1.default);
router.use("/order", order_routes_1.default);
router.use("/reservation", reservation_routes_1.default);
router.use("/review", review_routes_1.default);
exports.default = router;
