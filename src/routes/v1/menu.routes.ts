import express from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/roleCheck.middleware";
import { Role } from "../../models/user.model";
import {
  avaliableServiceToogle,
  createMenuItems,
  updateMenuItems,
} from "../../controllers/menu.controller";
import multer from "multer";
import { cloudinaryUpload } from "../../middlewares/cloudinary.middleware";
import {
  updateValidateMenuItems,
  validateMenuItems,
} from "../../validations/menu.validation";
import { deleterestaurant } from "../../controllers/restaurant.controller";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

router.post(
  "/create",
  verifyToken,
  allowRoles(Role.RESTAURANT_OWNER),
  upload.single("image"),
  cloudinaryUpload,
  validateMenuItems,
  createMenuItems,
);

router.put(
  "/update/:id",
  verifyToken,
  allowRoles(Role.RESTAURANT_OWNER),
  upload.single("image"),
  cloudinaryUpload,
  updateValidateMenuItems,
  updateMenuItems,
);

router.delete(
  "/delete/:id",
  verifyToken,
  allowRoles(Role.RESTAURANT_OWNER),
  deleterestaurant,
);

router.post(
  "/availability/:id",
  verifyToken,
  allowRoles(Role.RESTAURANT_OWNER),
  avaliableServiceToogle,
);

export default router;
