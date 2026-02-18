import express from "express";
import multer from "multer";
import { allowRoles } from "../../middlewares/roleCheck.middleware";
import {
  approval,
  createRestaraunt,
  deleteRestaraunt,
  updateRestaraunt,
} from "../../controllers/restaraunt.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { cloudinaryUploads } from "../../middlewares/cloudinary.middleware";
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
  allowRoles(Role.RESTARAUNT_OWNER, Role.SUPER_ADMIN),
  upload.array("images", 10),
  cloudinaryUploads,
  createRestaraunt,
);

router.put(
  "/update/:id",
   verifyToken,
  allowRoles(Role.RESTARAUNT_OWNER, Role.SUPER_ADMIN),
  upload.array("images", 10),
  cloudinaryUploads,
  updateRestaraunt,
);
router.delete(
  "/delete/:id",
  verifyToken,
  allowRoles(Role.RESTARAUNT_OWNER),
  deleteRestaraunt,
);

router.post("/approval/:id",verifyToken,allowRoles(Role.ADMIN),approval)

export default router;
