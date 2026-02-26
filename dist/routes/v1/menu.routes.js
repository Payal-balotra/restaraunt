"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const roleCheck_middleware_1 = require("../../middlewares/roleCheck.middleware");
const user_model_1 = require("../../models/user.model");
const menu_controller_1 = require("../../controllers/menu.controller");
const multer_1 = __importDefault(require("multer"));
const cloudinary_middleware_1 = require("../../middlewares/cloudinary.middleware");
const menu_validation_1 = require("../../validations/menu.validation");
const restaurant_controller_1 = require("../../controllers/restaurant.controller");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = (0, multer_1.default)({ storage: storage });
router.post(
  "/create",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  upload.single("image"),
  cloudinary_middleware_1.cloudinaryUpload,
  menu_validation_1.validateMenuItems,
  menu_controller_1.createMenuItems,
);
router.put(
  "/update/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  upload.single("image"),
  cloudinary_middleware_1.cloudinaryUpload,
  menu_controller_1.updateMenuItems,
);
router.delete(
  "/delete/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  restaurant_controller_1.deleterestaurant,
);
router.post(
  "/availability/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  menu_controller_1.avaliableServiceToogle,
);
exports.default = router;
