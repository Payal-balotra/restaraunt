import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { addToCart } from "../../controllers/cart.controller";
import { validateCartItems } from "../../validations/cart.validation";
const router = Router();

router.post("/add-to-cart", verifyToken, validateCartItems, addToCart);
export default router;
