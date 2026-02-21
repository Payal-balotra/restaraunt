import mongoose from "mongoose";
import { Order, STATUS, PAYMENT_STATUS } from "../models/order.model";
import { Menu } from "../models/menu.model";

export const placeOrderService = async ({
  user,
  restaurant,
  items,
}: {
  user: string;
  restaurant: string;
  items: { itemId: string; quantity: number }[];
}) => {
  if (!items || items.length === 0) {
    throw new Error("No items to place order");
  }

  const orderItems: {
    itemId: mongoose.Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
  }[] = [];

  let totalAmount = 0;

  for (const item of items) {
    const menuItem = await Menu.findById(item.itemId);
    if (!menuItem) {
      throw new Error(`Menu item not found: ${item.itemId}`);
    }

    const quantity = item.quantity || 1;

    orderItems.push({
      itemId: menuItem._id,
      name: menuItem.name,
      quantity,
      price: menuItem.price,
    });

    totalAmount += menuItem.price * quantity;
  }

  const order = await Order.create({
    user,
    restaurant,
    items: orderItems,
    totalAmount,
    status: STATUS.PLACED,
    paymentStatus: PAYMENT_STATUS.PENDING,
  });


  return order;
};

export const findOrderById = async(orderId: any) =>{
    return await Order.findById(orderId);
}