"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCountOfItems =
  exports.findItems =
  exports.updateCapacity =
  exports.deleterestaurantById =
  exports.updaterestaurantById =
  exports.findRestaurantById =
  exports.findrestaurantByname =
  exports.create =
    void 0;
const menu_model_1 = require("../models/menu.model");
const restaurant_model_1 = require("../models/restaurant.model");
const create = async (
  name,
  description,
  cuisine,
  images,
  owner,
  address,
  capacity,
) => {
  const restaurant = restaurant_model_1.Restaurant.create({
    name,
    description,
    cuisine,
    images,
    owner,
    address,
    capacity,
  });
  return restaurant;
};
exports.create = create;
const findrestaurantByname = (name) => {
  const existingrestaurant = restaurant_model_1.Restaurant.findOne({ name });
  return existingrestaurant;
};
exports.findrestaurantByname = findrestaurantByname;
const findRestaurantById = (id) => {
  const existingrestaurant = restaurant_model_1.Restaurant.findById(id);
  return existingrestaurant;
};
exports.findRestaurantById = findRestaurantById;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updaterestaurantById = (id, data) => {
  const updatedrestaurant = restaurant_model_1.Restaurant.findByIdAndUpdate(
    id,
    data,
    {
      returnDocument: "after",
    },
  );
  return updatedrestaurant;
};
exports.updaterestaurantById = updaterestaurantById;
const deleterestaurantById = async (id) => {
  const deletedRes = restaurant_model_1.Restaurant.findByIdAndDelete(id);
  return deletedRes;
};
exports.deleterestaurantById = deleterestaurantById;
const updateCapacity = async (id, num) => {
  const restaurant = await (0, exports.findRestaurantById)(id);
  if (restaurant) {
    restaurant.capacity += num;
    await restaurant.save();
  }
  return restaurant;
};
exports.updateCapacity = updateCapacity;
const findItems = (restaurant) => {
  const items = menu_model_1.Menu.find({ restaurant });
  return items;
};
exports.findItems = findItems;
const findCountOfItems = (restaurant) => {
  const totalCount = menu_model_1.Menu.countDocuments({ restaurant });
  return totalCount;
};
exports.findCountOfItems = findCountOfItems;
