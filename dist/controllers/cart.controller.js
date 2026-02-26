"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = void 0;
const Response_1 = require("../utils/Response");
const cart_services_1 = require("../services/cart.services");
const restaurant_services_1 = require("../services/restaurant.services");
const menuItem_services_1 = require("../services/menuItem.services");
const addToCart = async (req, res) => {
  const user = req.user._id.toString();
  const { restaurant, items } = req.body;
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
    return (0, Response_1.errorResponse)(res, 404, "Restaurant not found");
  }
  const menuItem = await (0, menuItem_services_1.findMenuItemInRes)(
    items[0].menuItem,
    restaurant,
  );
  if (!menuItem) {
    return (0, Response_1.errorResponse)(res, 404, "Menu Item not found");
  }
  if (!menuItem.isAvailable) {
    return (0, Response_1.errorResponse)(
      res,
      404,
      "Menu Item is not Available",
    );
  }
  const cartItem = (0, cart_services_1.addItemToCart)(
    user,
    restaurant,
    items[0].menuItem,
    items[0].quantity,
  );
  return (0, Response_1.response)(res, 200, "add to cart ", cartItem);
};
exports.addToCart = addToCart;
