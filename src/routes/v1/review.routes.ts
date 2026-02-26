import { Router } from "express";
import { averageRatings, review } from "../../controllers/review.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { validateReview } from "../../validations/review.validation";
const router = Router();

router.post("/give-review", verifyToken, validateReview, review);
router.get("/average-rating/:id", verifyToken, averageRatings);

export default router;
