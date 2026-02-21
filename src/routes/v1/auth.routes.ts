import express from "express";
import {
  login,
  refreshToken,
  register,
  updateUser,
} from "../../controllers/user.controller";
import { validationMiddleware } from "../../validations/user.validation";
import { verifyToken } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/roleCheck.middleware";
import { userIdCheck } from "../../middlewares/userCheckForUpdate.middleware";
import { Role } from "../../models/user.model";
const router = express.Router();

router.post("/register", validationMiddleware, register);
router.post("/login", login);
router.put("/update-user/:id", verifyToken, userIdCheck, updateUser);
router.post(
  "/create-admin",
  verifyToken,
  allowRoles(Role.SUPER_ADMIN),
  validationMiddleware,
  register,
);
router.post("/refresh-token", refreshToken);
export default router;
