import { Request, Response } from "express";
import { errorResponse, response } from "../utils/Response";
import { addItemToCart } from "../services/cart.services";
import { findRestaurantById } from "../services/restaurant.services";
import { findMenuItemInRes } from "../services/menuItem.services";

export const addToCart = async (req: Request, res: Response) => {
  const user = req.user._id.toString();
  const { restaurant, items } = req.body;
  const restaurantRes = await findRestaurantById(restaurant);
  if (!restaurantRes) {
    return errorResponse(res, 404, "Restaurant not found");
  }
  const menuItem = await findMenuItemInRes(items[0].menuItem, restaurant);
  if (!menuItem) {
    return errorResponse(res, 404, "Menu Item not found");
  }
  if (!menuItem.isAvailable) {
    return errorResponse(res, 404, "Menu Item is not Available");
  }

  const cartItem = addItemToCart(
    user,
    restaurant,
    items[0].menuItem,
    items[0].quantity,
  );

  return response(res, 200, "add to cart ", cartItem);
};
