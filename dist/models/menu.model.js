"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  restaurant: {
    type: mongoose_1.default.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});
exports.Menu = mongoose_1.default.model("Menu", userSchema);
