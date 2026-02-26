import { Request, Response } from "express";
import { blockUser } from "../services/admin.services";
import { errorResponse, response } from "../utils/Response";
import { Restaurant } from "../models/restaurant.model";
import {
  findCountOfItems,
  findItems,
  findRestaurantById,
} from "../services/restaurant.services";
import { User } from "../models/user.model";

export const inActiveUser = async (req: Request, res: Response) => {
  const userId = req.params.id as string;
  const user = await blockUser(userId);
  return response(res, 200, "User is InActive", user);
};

export const totalRestaurant = async (req: Request, res: Response) => {
  const total = await Restaurant.estimatedDocumentCount();
  if (total) {
    return response(res, 200, "Total number of Restraunts : ", total);
  }
  return errorResponse(res, 500, "Inernal server error");
};

export const itemsPerRestaurant = async (req: Request, res: Response) => {
  const restaurantId = req.params.id as string;
  const restaurant = await findRestaurantById(restaurantId);
  if (!restaurant) {
    return errorResponse(res, 404, "Restaurant not found");
  }
  const items = await findItems(restaurantId);
  const itemsCount = await findCountOfItems(restaurantId);

  if (!items) {
    return errorResponse(res, 404, "No item found");
  }
  return response(res, 200, "Items avaiable : ", {
    TotalMenuItems: {
      itemsCount,
    },
    items,
  });
};

// export const reservations = (req: Request, res: Response) => {
//   //
// };

export const customers = async (req: Request, res: Response) => {
  const owners = await User.countDocuments({ role: "customer" });
  return response(res, 200, "Total Customers", owners);
};

export const owners = async (req: Request, res: Response) => {
  const customers = await User.countDocuments({ role: "restaurant_owner" });
  return response(res, 200, "Total Owners", customers);
};

export const capacity = async (req: Request, res: Response) => {
  const result = await Restaurant.find({}, { name: 1, capacity: 1, _id: 0 });
  return response(res, 200, "Capacity of Restraunts", result);
};
