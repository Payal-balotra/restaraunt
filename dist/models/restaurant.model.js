"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// interface IRestaurant {
//   name : string,
//   description : string,
//   cuisine : string,
//   images : string[],
//   owner : Types.ObjectId,
//   address : string,
//   isActive : boolean
// }
const restaurantSchema = new mongoose_1.default.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  cuisine: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  owner: {
    type: mongoose_1.default.Schema.Types.ObjectId,
    ref: "User",
    immuatble: true,
    required: true,
  },
  address: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
    select: false,
  },
  capacity: {
    type: Number,
    default: 15,
  },
});
restaurantSchema.index({ name: "text", description: "text", cuisine: "text" });
exports.Restaurant = mongoose_1.default.model("Restaurant", restaurantSchema);
