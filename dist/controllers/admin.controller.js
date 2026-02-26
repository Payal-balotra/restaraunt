"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capacity =
  exports.owners =
  exports.customers =
  exports.itemsPerRestaurant =
  exports.totalRestaurant =
  exports.inActiveUser =
    void 0;
const admin_services_1 = require("../services/admin.services");
const Response_1 = require("../utils/Response");
const restaurant_model_1 = require("../models/restaurant.model");
const restaurant_services_1 = require("../services/restaurant.services");
const user_model_1 = require("../models/user.model");
const inActiveUser = async (req, res) => {
  const userId = req.params.id;
  const user = await (0, admin_services_1.blockUser)(userId);
  return (0, Response_1.response)(res, 200, "User is InActive", user);
};
exports.inActiveUser = inActiveUser;
const totalRestaurant = async (req, res) => {
  const total = await restaurant_model_1.Restaurant.estimatedDocumentCount();
  if (total) {
    return (0, Response_1.response)(
      res,
      200,
      "Total number of Restraunts : ",
      total,
    );
  }
  return (0, Response_1.errorResponse)(res, 500, "Inernal server error");
};
exports.totalRestaurant = totalRestaurant;
const itemsPerRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  const restaurant = await (0, restaurant_services_1.findRestaurantById)(
    restaurantId,
  );
  if (!restaurant) {
    return (0, Response_1.errorResponse)(res, 404, "Restaurant not found");
  }
  const items = await (0, restaurant_services_1.findItems)(restaurantId);
  const itemsCount = await (0, restaurant_services_1.findCountOfItems)(
    restaurantId,
  );
  if (!items) {
    return (0, Response_1.errorResponse)(res, 404, "No item found");
  }
  return (0, Response_1.response)(res, 200, "Items avaiable : ", {
    TotalMenuItems: {
      itemsCount,
    },
    items,
  });
};
exports.itemsPerRestaurant = itemsPerRestaurant;
// export const reservations = (req: Request, res: Response) => {
//   //
// };
const customers = async (req, res) => {
  const owners = await user_model_1.User.countDocuments({ role: "customer" });
  return (0, Response_1.response)(res, 200, "Total Customers", owners);
};
exports.customers = customers;
const owners = async (req, res) => {
  const customers = await user_model_1.User.countDocuments({
    role: "restaurant_owner",
  });
  return (0, Response_1.response)(res, 200, "Total Owners", customers);
};
exports.owners = owners;
const capacity = async (req, res) => {
  const result = await restaurant_model_1.Restaurant.find(
    {},
    { name: 1, capacity: 1, _id: 0 },
  );
  return (0, Response_1.response)(res, 200, "Capacity of Restraunts", result);
};
exports.capacity = capacity;
