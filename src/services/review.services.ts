import { Types } from "mongoose";
import { Review } from "../models/review.model";

export const findReview = (user: string, restaurant: string) => {
  const review = Review.findOne({ user, restaurant });
  return review;
};

export const createReview = async (
  user: string,
  restaurant: string,
  rating: number,
  comment: string,
) => {
  const review = Review.create({ user, restaurant, rating, comment });
  return review;
};
export const averageRating = async (restaurantId: string) => {
  const result = await Review.aggregate([
    {
      $match: { restaurant: new Types.ObjectId(restaurantId) },
    },
    {
      $group: {
        _id: "$restaurant",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  return result.length > 0 ? result[0].averageRating : 0;
};
