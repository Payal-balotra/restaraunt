"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("../../controllers/review.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post(
  "/give-review",
  auth_middleware_1.verifyToken,
  review_controller_1.review,
);
router.get(
  "/average-rating/:id",
  auth_middleware_1.verifyToken,
  review_controller_1.averageRatings,
);
exports.default = router;
