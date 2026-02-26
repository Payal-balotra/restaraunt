"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrderById = exports.placeOrderService = void 0;
const order_model_1 = require("../models/order.model");
const menu_model_1 = require("../models/menu.model");
const placeOrderService = async (
  userId,
  restaurantId,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items,
) => {
  if (!items || items.length === 0) {
    throw new Error("No items to place order");
  }
  const orderItems = [];
  let totalAmount = 0;
  for (const item of items) {
    const menuItem = await menu_model_1.Menu.findById(item.menuItem.toString());
    if (!menuItem) {
      throw new Error(`Menu item not found: ${item.itemId}`);
    }
    const quantity = item.quantity || 1;
    orderItems.push({
      itemId: menuItem._id,
      name: menuItem.name,
      quantity,
      price: menuItem.price,
    });
    totalAmount += menuItem.price * quantity;
  }
  const order = await order_model_1.Order.create({
    user: userId,
    restaurant: restaurantId,
    items: orderItems,
    totalAmount,
    status: order_model_1.STATUS.PLACED,
    paymentStatus: order_model_1.PAYMENT_STATUS.PENDING,
  });
  return order;
};
exports.placeOrderService = placeOrderService;
const findOrderById = async (orderId) => {
  return await order_model_1.Order.findById(orderId);
};
exports.findOrderById = findOrderById;
