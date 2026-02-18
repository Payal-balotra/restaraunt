import { Router } from "express";
import authRoutes from "./auth.routes";
import restarauntsRoutes from "./restaraunt.route";
import menuItemsRoutes from "./menu.routes"
const router = Router();

router.use("/auth", authRoutes);
router.use("/restaraunts", restarauntsRoutes);
router.use("/menu-items",menuItemsRoutes);

export default router;
