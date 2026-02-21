import { Types } from "mongoose";
import { Cart } from "../models/cart.model";

export const findCartById = async (userId: string) => {
  return await Cart.findById(userId);
};

export const addItemToCart = async (
  userId: string,
  restaurantId: string,
  menuItemId: string,
  quantity: number,
) => {
  const cart = await findCartById(userId);

  if (!cart) {
    return await Cart.create({
      user: userId,
      restaurant: restaurantId,
      items: [{ menuItem: menuItemId, quantity }],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.menuItem.toString() === menuItemId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      menuItem: new Types.ObjectId(menuItemId),
      quantity,
    });
  }

  await cart.save();
  return cart;
};
