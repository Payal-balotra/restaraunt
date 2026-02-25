import { Request, Response } from "express";
import {
  create,
  deleterestaurantById,
  findRestaurantById,
  findrestaurantByname,
  updaterestaurantById,
} from "../services/restaurant.services";
import { errorResponse, response } from "../utils/Response";
import catchAsync from "../utils/catchAsync";
import { Restaurant } from "../models/restaurant.model";

export const createrestaurant = catchAsync(
  async (req: Request, res: Response) => {
    const { name, description, cuisine, images, owner, address, capacity } =
      req.body;

    const existingRes = await findrestaurantByname(name);
    if (existingRes) {
      return errorResponse(res, 409, "restaurant by this name already exist");
    }
    const restaurant = await create(
      name,
      description,
      cuisine,
      images,
      owner,
      address,
      capacity,
    );

    return response(res, 201, "Resturant created successfully", restaurant);
  },
);

export const updaterestaurant = catchAsync(
  async (req: Request, res: Response) => {
    const restaurantId = req.params.id as string;
    const data = req.body;
    const restaurant = await findRestaurantById(restaurantId);
    if (!restaurant) {
      return errorResponse(res, 404, "No restaurant found");
    }
    const updatedrestaurant = await updaterestaurantById(restaurantId, data);
    return response(
      res,
      200,
      "restaurant Updated Successfully",
      updatedrestaurant,
    );
  },
);

export const deleterestaurant = catchAsync(
  async (req: Request, res: Response) => {
    const restaurantId = req.params.id as string;
    const restaurant = await findRestaurantById(restaurantId);
    if (!restaurant) {
      return errorResponse(res, 404, "No restaurant found");
    }
    const deletedRes = await deleterestaurantById(restaurantId);
    return response(res, 20, "restaurant deleted Successfully", deletedRes);
  },
);

export const approval = catchAsync(async (req: Request, res: Response) => {
  const restaurantId = req.params.id as string;
  if (!restaurantId) {
    return errorResponse(
      res,
      404,
      "please provide restaurant id to approve it",
    );
  }
  const restaruant = await findRestaurantById(restaurantId);
  if (restaruant) {
    restaruant.isActive = true;
    await restaruant.save();
  }
  return response(res, 200, "approval", []);
});

export const getRestaurants = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;
  const { search, cuisine } = req.query;

  const filter: Record<string, unknown> = {
    isActive: true,
  };
  if (typeof search === "string" && search.trim() !== "") {
    const searchRegex = new RegExp(search, "i");
    filter.$or = [
      { name: searchRegex },
      { description: searchRegex },
      { cuisine: searchRegex },
    ];
  }

  if (typeof cuisine === "string" && cuisine.trim() !== "") {
    filter.cuisine = { $regex: cuisine, $options: "i" };
  }

  const [data, totalCount] = await Promise.all([
    Restaurant.find(filter).skip(offset).limit(limit),
    Restaurant.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalCount / limit);
  const pagesLeft = totalPages > page ? totalPages - page : 0;

  return response(res, 200, "Restaurants", {
    data,
    pagination: {
      totalItems: totalCount,
      totalPages,
      currentPage: page,
      limit,
      pagesLeft,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  });
};
