"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var Role;
(function (Role) {
  Role["ADMIN"] = "admin";
  Role["CUSTOMER"] = "customer";
  Role["RESTAURANT_OWNER"] = "restaurant_owner";
  Role["SUPER_ADMIN"] = "super_admin";
})(Role || (exports.Role = Role = {}));
const userSchema = new mongoose_1.default.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.CUSTOMER,
      required: true,
      immutable: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
exports.User = mongoose_1.default.model("User", userSchema);
