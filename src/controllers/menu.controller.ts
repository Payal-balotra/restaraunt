import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import {
  createMenuItem,
  deleteMenuItemById,
  findMenuItemById,
  updateMenuItemById,
} from "../services/menuItem.services";
import { errorResponse, response } from "../utils/Response";

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

export const updateMenuItems = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const menuItemId = req.params.id;
    const restaraunt = await findMenuItemById(menuItemId);
    if (!restaraunt) {
      return errorResponse(res, 404, "No Menu Item found");
    }
    const updatedMenuItem = await updateMenuItemById(menuItemId, data);
    return response(
      res,
      200,
      "Menu Item Updated Successfully",
      updatedMenuItem,
    );
  },
);

export const deleteMenuItem = catchAsync(
  async (req: Request, res: Response) => {
    const menuItemId = req.params.id;
    const menuItem = await findMenuItemById(menuItemId);
    if (!menuItem) {
      return errorResponse(res, 404, "No Menu Item found");
    }
    await deleteMenuItemById(menuItemId);
    return response(res, 204, "Menu Item deleted Successfully", []);
  },
);

export const isAvaliable = catchAsync(async (req: Request, res: Response) => {
  const ItemId = req.params.id;
  if (!ItemId) {
    return errorResponse(
      res,
      404,
      "please provide restaraunt id to approve it",
    );
  }
  const item = await findMenuItemById(ItemId);
  if (item) {
    item.isAvailable = true;
    await item.save();
  }
  return response(res, 200, "Available", []);
});


export const isNotAvaliable = catchAsync(
  async (req: Request, res: Response) => {
   const ItemId = req.params.id;
  if (!ItemId) {
    return errorResponse(
      res,
      404,
      "please provide restaraunt id to approve it",
    );
  }
  const item = await findMenuItemById(ItemId);
  if (item) {
    item.isAvailable = false;
    await item.save();
  }
  return response(res, 200, "Unavailable", []);
}
);
