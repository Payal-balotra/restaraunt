"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = exports.TABLE_STATUS = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var TABLE_STATUS;
(function (TABLE_STATUS) {
  TABLE_STATUS["PENDING"] = "pending";
  TABLE_STATUS["CONFIRMED"] = "confirmed";
  TABLE_STATUS["CANCELLED"] = "cancelled";
  TABLE_STATUS["COMPLETED"] = "completed";
})(TABLE_STATUS || (exports.TABLE_STATUS = TABLE_STATUS = {}));
const reservationSchema = new mongoose_1.default.Schema(
  {
    user: {
      type: mongoose_1.default.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: mongoose_1.default.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: Object.values(TABLE_STATUS),
      default: TABLE_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
  },
);
exports.Reservation = mongoose_1.default.model(
  "Reservation",
  reservationSchema,
);
