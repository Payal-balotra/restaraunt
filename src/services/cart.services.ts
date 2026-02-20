import { Types } from "mongoose";
import { Cart } from "../models/cart.model";

export const findInCartById = async (userId: string) => {
  const cart = await Cart.findById(userId);
  return cart;
};
export const addItemToCart = async (
  userId: string,
  menuItemId: string,
  quantity: number
) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return await Cart.create({
      user: userId,
      items: [{ menuItem: menuItemId, quantity }],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.menuItem?.toString() === menuItemId // flow 
  );

  if (existingItem) {
    existingItem.quantity! += quantity;
  } else {
    cart.items.push({
      menuItem: new Types.ObjectId(menuItemId),
      quantity,
    });
  }

  await cart.save();
  return cart;
};