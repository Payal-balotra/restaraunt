import { Router } from "express";
// import { verifyToken } from "../../middlewares/auth.middleware";
import { addToCart } from "../../controllers/cart.controller";
const router = Router();


router.post("/add-to-cart",addToCart)
export default router;