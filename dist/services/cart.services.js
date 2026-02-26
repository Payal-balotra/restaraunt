"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItemToCart =
  exports.findCartByUserId =
  exports.findCartById =
    void 0;
const mongoose_1 = require("mongoose");
const cart_model_1 = require("../models/cart.model");
const findCartById = async (userId) => {
  return await cart_model_1.Cart.findById(userId);
};
exports.findCartById = findCartById;
const findCartByUserId = async (userId) => {
  return await cart_model_1.Cart.findOne({ user: userId });
};
exports.findCartByUserId = findCartByUserId;
const addItemToCart = async (userId, restaurantId, menuItemId, quantity) => {
  const cart = await (0, exports.findCartByUserId)(userId);
  if (!cart) {
    return await cart_model_1.Cart.create({
      user: userId,
      restaurant: restaurantId,
      items: [{ menuItem: menuItemId, quantity }],
    });
  }
  const existingItem = cart.items.find(
    (item) => item.menuItem.toString() === menuItemId,
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      menuItem: new mongoose_1.Types.ObjectId(menuItemId),
      quantity,
    });
  }
  await cart.save();
  return cart;
};
exports.addItemToCart = addItemToCart;
