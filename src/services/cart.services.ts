import { Types } from "mongoose";
import { Cart } from "../models/cart.model";
import { findMenuItemInRes } from "./menuItem.services";

export const findInCartById = async (userId: string) => {
  const cart = await Cart.findById(userId);
  return cart;
};


export const addItemToCart = async (
  userId: string,
  restaurantId : string,
  menuItemId: string,
  quantity: number
) => {
    const itemAvail = await findMenuItemInRes(menuItemId , restaurantId);

  if (!itemAvail) {
    return new Error("Menu item not found");
  }
   if (!itemAvail.isAvailable) {
    return  new Error("Menu item is not available");
  }

  const cart = await Cart.findOne({ user: userId });


  if (!cart) {
    return await Cart.create({
      user: userId,
      restaurant : restaurantId,
      items: [{ menuItem: menuItemId, quantity }],
    });
  }

   const existingItem = cart.items.find(
    (item) => item.menuItem.toString() === menuItemId
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