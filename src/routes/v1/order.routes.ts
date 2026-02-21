import express from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { acceptOrder, cancelOrder, completedOrder, outForDelivery, placeOrder, prepareOrder } from "../../controllers/order.controller";
import { validateOrder } from "../../validations/order.validation";
import { allowRoles } from "../../middlewares/roleCheck.middleware";
import { Role } from "../../models/user.model";
const router = express.Router();
router.post("/place-order",verifyToken,validateOrder,placeOrder)
router.post("/accept-order/:id",verifyToken,allowRoles(Role.RESTAURANT_OWNER),acceptOrder)
router.post("/prepare-order/:id",verifyToken,allowRoles(Role.RESTAURANT_OWNER),prepareOrder)
router.post("/outForDelivery-order/:id",verifyToken,allowRoles(Role.RESTAURANT_OWNER),outForDelivery)
router.post("/completed-order/:id",verifyToken,allowRoles(Role.RESTAURANT_OWNER),completedOrder)
router.post("/cancel-order/:id",verifyToken,allowRoles(Role.RESTAURANT_OWNER),cancelOrder)

export default router;
