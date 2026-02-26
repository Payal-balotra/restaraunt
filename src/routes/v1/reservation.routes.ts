import express from "express";
import {
  cancelReservation,
  completedReservation,
  confirmReservation,
  reservation,
} from "../../controllers/reservation.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/roleCheck.middleware";
import { Role } from "../../models/user.model";
import { validateReservation } from "../../validations/reservation.validation";
const router = express.Router();

router.post("/request", verifyToken, validateReservation, reservation);
router.post(
  "/confirmed/:id",
  verifyToken,
  allowRoles(Role.RESTAURANT_OWNER),
  confirmReservation,
);
router.post(
  "/cancel/:id",
  verifyToken,
  allowRoles(Role.RESTAURANT_OWNER),
  cancelReservation,
);
router.post(
  "/completed/:id",
  verifyToken,
  allowRoles(Role.RESTAURANT_OWNER),
  completedReservation,
);
export default router;
