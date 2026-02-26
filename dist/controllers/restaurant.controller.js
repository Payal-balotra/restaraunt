"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurants =
  exports.approval =
  exports.deleterestaurant =
  exports.updaterestaurant =
  exports.createrestaurant =
    void 0;
const restaurant_services_1 = require("../services/restaurant.services");
const Response_1 = require("../utils/Response");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const restaurant_model_1 = require("../models/restaurant.model");
exports.createrestaurant = (0, catchAsync_1.default)(async (req, res) => {
  const { name, description, cuisine, images, owner, address, capacity } =
    req.body;
  const existingRes = await (0, restaurant_services_1.findrestaurantByname)(
    name,
  );
  if (existingRes) {
    return (0, Response_1.errorResponse)(
      res,
      409,
      "restaurant by this name already exist",
    );
  }
  const restaurant = await (0, restaurant_services_1.create)(
    name,
    description,
    cuisine,
    images,
    owner,
    address,
    capacity,
  );
  return (0, Response_1.response)(
    res,
    201,
    "Resturant created successfully",
    restaurant,
  );
});
exports.updaterestaurant = (0, catchAsync_1.default)(async (req, res) => {
  const restaurantId = req.params.id;
  const data = req.body;
  const restaurant = await (0, restaurant_services_1.findRestaurantById)(
    restaurantId,
  );
  if (!restaurant) {
    return (0, Response_1.errorResponse)(res, 404, "No restaurant found");
  }
  const updatedrestaurant = await (0,
  restaurant_services_1.updaterestaurantById)(restaurantId, data);
  return (0, Response_1.response)(
    res,
    200,
    "restaurant Updated Successfully",
    updatedrestaurant,
  );
});
exports.deleterestaurant = (0, catchAsync_1.default)(async (req, res) => {
  const restaurantId = req.params.id;
  const restaurant = await (0, restaurant_services_1.findRestaurantById)(
    restaurantId,
  );
  if (!restaurant) {
    return (0, Response_1.errorResponse)(res, 404, "No restaurant found");
  }
  const deletedRes = await (0, restaurant_services_1.deleterestaurantById)(
    restaurantId,
  );
  return (0, Response_1.response)(
    res,
    20,
    "restaurant deleted Successfully",
    deletedRes,
  );
});
exports.approval = (0, catchAsync_1.default)(async (req, res) => {
  const restaurantId = req.params.id;
  if (!restaurantId) {
    return (0, Response_1.errorResponse)(
      res,
      404,
      "please provide restaurant id to approve it",
    );
  }
  const restaruant = await (0, restaurant_services_1.findRestaurantById)(
    restaurantId,
  );
  if (restaruant) {
    restaruant.isActive = true;
    await restaruant.save();
  }
  return (0, Response_1.response)(res, 200, "approval", []);
});
const getRestaurants = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const { search, cuisine } = req.query;
  const filter = {
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
    restaurant_model_1.Restaurant.find(filter).skip(offset).limit(limit),
    restaurant_model_1.Restaurant.countDocuments(filter),
  ]);
  const totalPages = Math.ceil(totalCount / limit);
  const pagesLeft = totalPages > page ? totalPages - page : 0;
  return (0, Response_1.response)(res, 200, "Restaurants", {
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
exports.getRestaurants = getRestaurants;
