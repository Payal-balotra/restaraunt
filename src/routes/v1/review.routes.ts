import { Router } from "express";
import { averageRatings, review } from "../../controllers/review.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
const router = Router();

router.post("/give-review", verifyToken, review);
router.get("/average-rating/:id", verifyToken, averageRatings);

export default router;
