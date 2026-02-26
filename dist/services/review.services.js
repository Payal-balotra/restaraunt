"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.averageRating = exports.createReview = exports.findReview = void 0;
const mongoose_1 = require("mongoose");
const review_model_1 = require("../models/review.model");
const findReview = (user, restaurant) => {
  const review = review_model_1.Review.findOne({ user, restaurant });
  return review;
};
exports.findReview = findReview;
const createReview = async (user, restaurant, rating, comment) => {
  const review = review_model_1.Review.create({
    user,
    restaurant,
    rating,
    comment,
  });
  return review;
};
exports.createReview = createReview;
const averageRating = async (restaurantId) => {
  const result = await review_model_1.Review.aggregate([
    {
      $match: { restaurant: new mongoose_1.Types.ObjectId(restaurantId) },
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
exports.averageRating = averageRating;
