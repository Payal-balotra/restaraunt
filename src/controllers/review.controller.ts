import { Request, Response } from "express";
import { findRestaurantById } from "../services/restaurant.services";
import { errorResponse, response } from "../utils/Response";
import {
  averageRating,
  createReview,
  findReview,
} from "../services/review.services";
import catchAsync from "../utils/catchAsync";

export const review = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id.toString();
  const { restaurant, rating, comment } = req.body;
  const restaurantRes = await findRestaurantById(restaurant);
  if (!restaurantRes?.isActive) {
    return errorResponse(res, 503, "Restaraunt is not approved by admin yet");
  }
  if (!restaurantRes) {
    return errorResponse(res, 404, "Restaurant Not Found");
  }

  const alreadyReviewed = await findReview(userId, restaurant);
  if (alreadyReviewed) {
    return errorResponse(res, 409, "Already Reviewed");
  }
  const createdReview = await createReview(userId, restaurant, rating, comment);
  if (!createReview) {
    return errorResponse(res, 500, "Can't craete review");
  }
  return response(res, 200, "Review created", createdReview);
});

export const averageRatings = catchAsync(
  async (req: Request, res: Response) => {
    const restaurant = req.params.id as string;
    const average = await averageRating(restaurant);
    return response(res, 200, "Average Rating", Math.round(average));
  },
);
