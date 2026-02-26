"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.averageRatings = exports.review = void 0;
const restaurant_services_1 = require("../services/restaurant.services");
const Response_1 = require("../utils/Response");
const review_services_1 = require("../services/review.services");
const review = async (req, res) => {
  const userId = req.user?._id.toString();
  const { restaurant, rating, comment } = req.body;
  const restaurantRes = await (0, restaurant_services_1.findRestaurantById)(
    restaurant,
  );
  if (!restaurantRes?.isActive) {
    return (0, Response_1.errorResponse)(
      res,
      503,
      "Restaraunt is not approved by admin yet",
    );
  }
  if (!restaurantRes) {
    return (0, Response_1.errorResponse)(res, 404, "Restaurant Not Found");
  }
  const alreadyReviewed = await (0, review_services_1.findReview)(
    userId,
    restaurant,
  );
  if (alreadyReviewed) {
    return (0, Response_1.errorResponse)(res, 409, "Already Reviewed");
  }
  const createdReview = await (0, review_services_1.createReview)(
    userId,
    restaurant,
    rating,
    comment,
  );
  if (!review_services_1.createReview) {
    return (0, Response_1.errorResponse)(res, 500, "Can't craete review");
  }
  return (0, Response_1.response)(res, 200, "Review created", createdReview);
};
exports.review = review;
const averageRatings = async (req, res) => {
  const restaurant = req.params.id;
  const average = await (0, review_services_1.averageRating)(restaurant);
  return (0, Response_1.response)(
    res,
    200,
    "Average Rating",
    Math.round(average),
  );
};
exports.averageRatings = averageRatings;
