"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const cart_controller_1 = require("../../controllers/cart.controller");
const cart_validation_1 = require("../../validations/cart.validation");
const router = (0, express_1.Router)();
router.post(
  "/add-to-cart",
  auth_middleware_1.verifyToken,
  cart_validation_1.validateCartItems,
  cart_controller_1.addToCart,
);
exports.default = router;
