import express from "express";
import multer from "multer";
import { allowRoles } from "../../middlewares/roleCheck.middleware";
import { createRestaraunt } from "../../controllers/restaraunt.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { cloudinaryUpload } from "../../middlewares/cloudinary.middleware";
import { Role } from "../../models/user.model";
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
  upload.array("images", 10), // req.files come 
  cloudinaryUpload,
  createRestaraunt,
);

export default router;
