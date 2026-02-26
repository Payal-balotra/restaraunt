"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const cartItemSchema = new mongoose_1.Schema(
  {
    menuItem: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);
const cartSchema = new mongoose_1.Schema({
  user: {
    type: mongoose_1.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: mongoose_1.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  items: {
    type: [cartItemSchema],
    default: [],
  },
});
exports.Cart = mongoose_2.default.model("Cart", cartSchema);
