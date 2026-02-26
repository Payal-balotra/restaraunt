"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const roleCheck_middleware_1 = require("../../middlewares/roleCheck.middleware");
const restaurant_controller_1 = require("../../controllers/restaurant.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const cloudinary_middleware_1 = require("../../middlewares/cloudinary.middleware");
const user_model_1 = require("../../models/user.model");
const restaurant_validation_1 = require("../../validations/restaurant.validation");
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
router.get("/get", restaurant_controller_1.getRestaurants);
router.post(
  "/create",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  upload.array("images", 10),
  cloudinary_middleware_1.cloudinaryUploads,
  restaurant_validation_1.validateRestaurant,
  restaurant_controller_1.createrestaurant,
);
router.put(
  "/update/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  upload.array("images", 10),
  cloudinary_middleware_1.cloudinaryUploads,
  restaurant_controller_1.updaterestaurant,
);
router.delete(
  "/delete/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.RESTAURANT_OWNER),
  restaurant_controller_1.deleterestaurant,
);
router.post(
  "/approval/:id",
  auth_middleware_1.verifyToken,
  (0, roleCheck_middleware_1.allowRoles)(user_model_1.Role.ADMIN),
  restaurant_controller_1.approval,
);
exports.default = router;
