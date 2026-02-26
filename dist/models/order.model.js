"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.PAYMENT_STATUS = exports.STATUS = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var STATUS;
(function (STATUS) {
  STATUS["PLACED"] = "placed";
  STATUS["ACCEPTED"] = "Accepted";
  STATUS["PREPARING"] = "preparing";
  STATUS["OUT_FOR_DELIVERY"] = "outForDelivery";
  STATUS["COMPLETED"] = "completed";
  STATUS["CANCELLED"] = "cancelled";
})(STATUS || (exports.STATUS = STATUS = {}));
var PAYMENT_STATUS;
(function (PAYMENT_STATUS) {
  PAYMENT_STATUS["PENDING"] = "pending";
  PAYMENT_STATUS["COMPLETED"] = "completed";
  PAYMENT_STATUS["FAILED"] = "failed";
  PAYMENT_STATUS["REFUNDED"] = "refunded";
})(PAYMENT_STATUS || (exports.PAYMENT_STATUS = PAYMENT_STATUS = {}));
const orderSchema = new mongoose_1.default.Schema({
  user: {
    type: mongoose_1.default.Schema.Types.ObjectId,
    ref: "User",
  },
  restaurant: {
    type: mongoose_1.default.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  items: [
    {
      itemId: { type: mongoose_1.Types.ObjectId, ref: "Menu" },
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: {
    type: Number,
  },
  status: {
    type: String,
    enum: Object.values(STATUS),
    default: STATUS.PLACED,
  },
  paymentStatus: {
    type: String,
    enum: Object.values(PAYMENT_STATUS),
    default: PAYMENT_STATUS.PENDING,
  },
  createdAt: { type: Date, default: Date.now },
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
