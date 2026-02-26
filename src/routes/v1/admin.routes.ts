import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/roleCheck.middleware";
import { Role } from "../../models/user.model";
import {
  capacity,
  customers,
  inActiveUser,
  itemsPerRestaurant,
  owners,
  totalRestaurant,
} from "../../controllers/admin.controller";
const router = Router();

router.post(
  "/inactive-user/:id",
  verifyToken,
  allowRoles(Role.ADMIN),
  inActiveUser,
);
router.get(
  "/total-restaurants",
  verifyToken,
  allowRoles(Role.ADMIN),
  totalRestaurant,
);
router.get(
  "/menu-itmes/:id",
  verifyToken,
  allowRoles(Role.ADMIN),
  itemsPerRestaurant,
);
// router.get("/reservations",verifyToken,allowRoles(Role.ADMIN))
router.get("/customers", verifyToken, allowRoles(Role.ADMIN), customers);
router.get("/owners", verifyToken, allowRoles(Role.ADMIN), owners);
router.get("/capacity", verifyToken, allowRoles(Role.ADMIN), capacity);
router.get(
  "/users-orders-per-restaurant/:id",
  verifyToken,
  allowRoles(Role.ADMIN),
);

export default router;
