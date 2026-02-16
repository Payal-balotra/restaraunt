import { Router } from "express";
import authRoutes from "./auth.routes"
import restarauntsRoutes from "./restaraunt.route"
const router = Router();

router.use("/auth",authRoutes);

router.use("/restaraunts",restarauntsRoutes)

export default router;