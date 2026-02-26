import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/roleCheck.middleware";
import { Role } from "../../models/user.model";
import {
  capacity,
  inActiveUser,
  itemsPerRestaurant,
  orders,
  rating,
  reservation,
  totalRestaurant,
  users,
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
router.get("/users", verifyToken, allowRoles(Role.ADMIN), users);
router.get("/capacity", verifyToken, allowRoles(Role.ADMIN), capacity);
router.get("/orders", verifyToken, allowRoles(Role.ADMIN), orders);
router.get("/reservations", verifyToken, allowRoles(Role.ADMIN), reservation);
router.get("/averageRating", verifyToken, allowRoles(Role.ADMIN), rating);

export default router;
