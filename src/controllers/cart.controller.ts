import { Request, Response } from "express";
import { response } from "../utils/Response";
import { addItemToCart } from "../services/cart.services";

export const addToCart = async (req: Request, res: Response) => {
  const { user, restaurant, items } = req.body;
  
  // firslty check for res 
  //then check for menu item 
  // then add to cart 
  const cartItem = addItemToCart(
    user,
    restaurant,
    items[0].menuItem,
    items[0].quantity,
  );

  return response(res, 200, "add to cart ", cartItem);
};
