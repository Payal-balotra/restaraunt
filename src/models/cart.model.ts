import { Schema } from "mongoose";
import mongoose from "mongoose";
import { Types } from "mongoose";

export interface ICartItem {
  menuItem: Types.ObjectId;
  quantity: number;
}

export interface ICart {
  user: Types.ObjectId;
  restaurant : Types.ObjectId;
  items: ICartItem[];
}

const cartItemSchema = new Schema<ICartItem>(
  {
    menuItem: {
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);
const cartSchema = new Schema<ICart>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant : {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  items: {
    type: [cartItemSchema],
    default: [],
  },
});
export const Cart = mongoose.model<ICart>("Cart", cartSchema);
