"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTableAvailable =
  exports.findReservationById =
  exports.createReservation =
    void 0;
const table_model_1 = require("../models/table.model");
const restaurant_services_1 = require("./restaurant.services");
const createReservation = async (
  user,
  restaurant,
  startTime,
  endTime,
  guests,
) => {
  const reserved = table_model_1.Reservation.create({
    user,
    restaurant,
    startTime,
    endTime,
    guests,
  });
  const restaurantRes = await (0, restaurant_services_1.findRestaurantById)(
    restaurant,
  );
  if (restaurantRes) {
    restaurantRes.capacity = restaurantRes?.capacity - guests;
    await restaurantRes.save();
  }
  return reserved;
};
exports.createReservation = createReservation;
const findReservationById = (id) => {
  return table_model_1.Reservation.findById(id);
};
exports.findReservationById = findReservationById;
const isTableAvailable = async (restaurant, startTime, endTime) => {
  const results = await table_model_1.Reservation.findOne({
    restaurant,
    startTime: { $lte: endTime },
    endTime: { $gte: startTime },
  });
  return results;
};
exports.isTableAvailable = isTableAvailable;
