import { Request, Response } from "express";
import { response } from "../utils/Response";
import { addItemToCart } from "../services/cart.services";

export const addToCart = async (req: Request, res: Response) => {
  const { user, items } = req.body; 

 const cartItem =  addItemToCart(user , items[0].menuItem ,items[0].quantity)
 

  return response(res, 200, "add to cart ",cartItem);
};
