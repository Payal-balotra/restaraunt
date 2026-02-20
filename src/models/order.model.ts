import mongoose, { model, Types } from "mongoose";
interface IOrderItem {
  itemId: Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
}
export enum STATUS {
  PLACED = "placed",
  ACCEPTED = "Accepted",
  PREPARING = "preparing",
  OUT_FOR_DELIVERY = "outForDelivery",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}
export enum PAYMENT_STATUS {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}
export interface IOrder {
  user: Types.ObjectId;
  restaurant: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: STATUS;
  paymentStatus: PAYMENT_STATUS;
  createdAt: Date;
}
const orderSchema = new mongoose.Schema<IOrder>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  items: [
    {
      productId: { type: Types.ObjectId, ref: "Menu" },
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

export const Order = model<IOrder>("Order", orderSchema);
