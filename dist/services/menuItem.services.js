"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItemById =
  exports.updateMenuItemById =
  exports.findMenuItemInRes =
  exports.findMenuItemById =
  exports.createMenuItem =
    void 0;
const menu_model_1 = require("../models/menu.model");
const createMenuItem = async (
  name,
  price,
  category,
  image,
  restaurant,
  isAvailable,
) => {
  const item = menu_model_1.Menu.create({
    name,
    price,
    category,
    image,
    restaurant,
    isAvailable,
  });
  return item;
};
exports.createMenuItem = createMenuItem;
const findMenuItemById = async (id) => {
  return await menu_model_1.Menu.findById(id);
};
exports.findMenuItemById = findMenuItemById;
const findMenuItemInRes = async (itemId, restaurantId) => {
  return await menu_model_1.Menu.findOne({
    _id: itemId,
    restaurant: restaurantId,
  });
};
exports.findMenuItemInRes = findMenuItemInRes;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateMenuItemById = (id, data) => {
  const updatedMenuItem = menu_model_1.Menu.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  return updatedMenuItem;
};
exports.updateMenuItemById = updateMenuItemById;
const deleteMenuItemById = async (id) => {
  const deletedItem = menu_model_1.Menu.findByIdAndDelete(id);
  return deletedItem;
};
exports.deleteMenuItemById = deleteMenuItemById;
