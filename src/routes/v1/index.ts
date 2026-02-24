import { Router } from "express";
import authRoutes from "./auth.routes";
import restaurantsRoutes from "./restaurant.route";
import menuItemsRoutes from "./menu.routes";
import cartRoutes from "./cart.routes";
import orderRoutes from "./order.routes";
import reservationRoutes from "./reservation.routes";
// import reviewRoutes from "./review.routes"

const router = Router();

router.use("/auth", authRoutes);
router.use("/restaurants", restaurantsRoutes);
router.use("/menu-items", menuItemsRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);
router.use("/reservation", reservationRoutes);
// router.use("/review",reviewRoutes);

export default router;
