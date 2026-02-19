import express from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/roleCheck.middleware";
import { Role } from "../../models/user.model";
import {
  createMenuItems,
  isAvaliable,
  isNotAvaliable,
  updateMenuItems,
} from "../../controllers/menu.controller";
import multer from "multer";
import { cloudinaryUpload } from "../../middlewares/cloudinary.middleware";
import { validateMenuItems } from "../../validations/menu.validation";
import { deleteRestaraunt } from "../../controllers/restaraunt.controller";

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
  allowRoles(Role.RESTARAUNT_OWNER),
  upload.single("image"),
  cloudinaryUpload,
   validateMenuItems,
  createMenuItems,
);

router.put(
  "/update/:id",
  verifyToken,
  allowRoles(Role.RESTARAUNT_OWNER),
  upload.single("image"),
  cloudinaryUpload,
  updateMenuItems,
);

router.delete(
  "/delete/:id",
  verifyToken,
  allowRoles(Role.RESTARAUNT_OWNER),
  deleteRestaraunt,
);

router.post("/available/:id",verifyToken,allowRoles(Role.RESTARAUNT_OWNER),isAvaliable)
router.post("/unavailable/:id",verifyToken,allowRoles(Role.RESTARAUNT_OWNER),isNotAvaliable)


export default router;
