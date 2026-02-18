import express from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/roleCheck.middleware";
import { Role } from "../../models/user.model";
import { createMenuItems } from "../../controllers/menu.controller";
import multer from "multer";
import { cloudinaryUpload } from "../../middlewares/cloudinary.middleware";

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
  createMenuItems,
);
export default router;
