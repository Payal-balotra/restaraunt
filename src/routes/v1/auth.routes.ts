import express from "express";
import { login, register } from "../../controllers/user.controller";
import { validationMiddleware } from "../../validations/user.validation";
import { verifyToken } from "../../middlewares/auth.middleware";
const router = express.Router();


router.post("/register",validationMiddleware,register);
router.post("/login",login);
router.post("/create-admin",verifyToken,validationMiddleware,register)


export default router;