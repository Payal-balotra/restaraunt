import express from "express";
import {
  login,
  refreshToken,
  register,
  updateUser,
} from "../../controllers/user.controller";
import { validationMiddleware } from "../../validations/user.validation";
import { getUser } from "../../middlewares/auth.middleware";
import { checkSuperAdminRole } from "../../middlewares/roleCheck.middleware";
import { userIdCheck } from "../../middlewares/userCheckForUpdate.middleware";
const router = express.Router();

router.post("/register", validationMiddleware, register);
router.post("/login", login);
router.put("/update-user/:id", getUser, userIdCheck, updateUser);
router.post(
  "/create-admin",
  getUser,
  checkSuperAdminRole,
  validationMiddleware,
  register,
);
router.post("/refresh-token",refreshToken);
export default router;
