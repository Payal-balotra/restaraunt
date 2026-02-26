"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder =
  exports.completedOrder =
  exports.outForDelivery =
  exports.prepareOrder =
  exports.acceptOrder =
  exports.placeOrder =
    void 0;
const restaurant_services_1 = require("../services/restaurant.services");
const Response_1 = require("../utils/Response");
const order_services_1 = require("../services/order.services");
const order_model_1 = require("../models/order.model");
const cart_services_1 = require("../services/cart.services");
const placeOrder = async (req, res) => {
  const userId = req.user?._id.toString();
  const cart = await (0, cart_services_1.findCartByUserId)(userId);
  if (!cart) {
    return (0, Response_1.errorResponse)(res, 404, "Restaraunt Not Found");
  }
  const restaurantId = cart.restaurant.toString();
  const restaurantRes = await (0, restaurant_services_1.findRestaurantById)(
    restaurantId,
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
  const items = cart.items;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return (0, Response_1.errorResponse)(res, 400, "Items are required");
  }
  const order = await (0, order_services_1.placeOrderService)(
    userId,
    restaurantId,
    items,
  );
  return (0, Response_1.response)(res, 200, "Order Placed successfully", order);
};
exports.placeOrder = placeOrder;
const acceptOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await (0, order_services_1.findOrderById)(orderId);
  if (!order) {
    return (0, Response_1.errorResponse)(res, 404, "Order not found");
  }
  const restaurant = await (0, restaurant_services_1.findRestaurantById)(
    order.restaurant.toString(),
  );
  if (!restaurant) {
    return (0, Response_1.errorResponse)(res, 404, "Restaurant Not Found");
  }
  if (restaurant.owner.toString() !== req.user._id.toString()) {
    return (0, Response_1.errorResponse)(
      res,
      403,
      "You are not authorized to accept this order",
    );
  }
  order.status = order_model_1.STATUS.ACCEPTED;
  await order.save();
  return (0, Response_1.response)(res, 200, "Order Accepted", order);
};
exports.acceptOrder = acceptOrder;
const prepareOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await (0, order_services_1.findOrderById)(orderId);
  if (!order) {
    return (0, Response_1.errorResponse)(res, 404, "Order not found");
  }
  const restaurant = await (0, restaurant_services_1.findRestaurantById)(
    order.restaurant.toString(),
  );
  if (!restaurant) {
    return (0, Response_1.errorResponse)(res, 404, "Restaurant Not Found");
  }
  if (restaurant.owner.toString() !== req.user._id.toString()) {
    return (0, Response_1.errorResponse)(
      res,
      403,
      "You are not authorized to accept this order",
    );
  }
  order.status = order_model_1.STATUS.PREPARING;
  await order.save();
  return (0, Response_1.response)(res, 200, "Order preparing", order);
};
exports.prepareOrder = prepareOrder;
const outForDelivery = async (req, res) => {
  const orderId = req.params.id;
  const order = await (0, order_services_1.findOrderById)(orderId);
  if (!order) {
    return (0, Response_1.errorResponse)(res, 404, "Order not found");
  }
  const restaurant = await (0, restaurant_services_1.findRestaurantById)(
    order.restaurant.toString(),
  );
  if (!restaurant) {
    return (0, Response_1.errorResponse)(res, 404, "Restaurant Not Found");
  }
  if (restaurant.owner.toString() !== req.user._id.toString()) {
    return (0, Response_1.errorResponse)(
      res,
      403,
      "You are not authorized to accept this order",
    );
  }
  order.status = order_model_1.STATUS.OUT_FOR_DELIVERY;
  await order.save();
  return (0, Response_1.response)(res, 200, "Order out for delivery", order);
};
exports.outForDelivery = outForDelivery;
const completedOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await (0, order_services_1.findOrderById)(orderId);
  if (!order) {
    return (0, Response_1.errorResponse)(res, 404, "Order not found");
  }
  const restaurant = await (0, restaurant_services_1.findRestaurantById)(
    order.restaurant.toString(),
  );
  if (!restaurant) {
    return (0, Response_1.errorResponse)(res, 404, "Restaurant Not Found");
  }
  if (restaurant.owner.toString() !== req.user._id.toString()) {
    return (0, Response_1.errorResponse)(
      res,
      403,
      "You are not authorized to accept this order",
    );
  }
  order.status = order_model_1.STATUS.COMPLETED;
  await order.save();
  return (0, Response_1.response)(res, 200, "Order Completed", order);
};
exports.completedOrder = completedOrder;
const cancelOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await (0, order_services_1.findOrderById)(orderId);
  if (!order) {
    return (0, Response_1.errorResponse)(res, 404, "Order not found");
  }
  const restaurant = await (0, restaurant_services_1.findRestaurantById)(
    order.restaurant.toString(),
  );
  if (!restaurant) {
    return (0, Response_1.errorResponse)(res, 404, "Restaurant Not Found");
  }
  if (restaurant.owner.toString() !== req.user._id.toString()) {
    return (0, Response_1.errorResponse)(
      res,
      403,
      "You are not authorized to accept this order",
    );
  }
  order.status = order_model_1.STATUS.CANCELLED;
  await order.save();
  return (0, Response_1.response)(res, 200, "Order Cancelled", order);
};
exports.cancelOrder = cancelOrder;
