import { Request, Response } from "express";
import {
  averageRating,
  blockUser,
  capacityCheck,
  countUsers,
  totalOrders,
  totalReservation,
} from "../services/admin.services";
import { errorResponse, response } from "../utils/Response";
import { Restaurant } from "../models/restaurant.model";
import {
  findCountOfItems,
  findItems,
  findRestaurantById,
} from "../services/restaurant.services";
import catchAsync from "../utils/catchAsync";

export const inActiveUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id as string;
  const user = await blockUser(userId);
  return response(res, 200, "User is InActive", user);
});

export const totalRestaurant = catchAsync(
  async (req: Request, res: Response) => {
    const total = await Restaurant.estimatedDocumentCount();
    if (total) {
      return response(res, 200, "Total number of Restraunts : ", total);
    }
    return errorResponse(res, 500, "Inernal server error");
  },
);

export const itemsPerRestaurant = catchAsync(
  async (req: Request, res: Response) => {
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
  },
);

export const users = catchAsync(async (req: Request, res: Response) => {
  const allUsers = await countUsers();
  return response(res, 200, "Users", allUsers);
});

export const capacity = catchAsync(async (req: Request, res: Response) => {
  const result = capacityCheck();
  return response(res, 200, "Capacity of Restraunts", result);
});

export const orders = catchAsync(async (req: Request, res: Response) => {
  const result = await totalOrders();
  return response(res, 200, "Orders", result);
});
export const reservation = catchAsync(async (req: Request, res: Response) => {
  const result = await totalReservation();
  return response(res, 200, "Reservations", result);
});

export const rating = catchAsync(async (req: Request, res: Response) => {
  const result = await averageRating();
  return response(res, 200, "Average Rating of all Restaurants", result);
});
