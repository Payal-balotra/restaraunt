import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { createMenuItem } from "../services/menuItem.services";
import { response } from "../utils/Response";

export const createMenuItems = catchAsync(
  async (req: Request, res: Response) => {
    const { name, price, category, image, restaurant, isAvailable } = req.body;
    const item = await createMenuItem(
      name,
      price,
      category,
      image,
      restaurant,
      isAvailable,
    );

    return response(res, 201, "Menu Item Created Successfully", item);
  },
);
