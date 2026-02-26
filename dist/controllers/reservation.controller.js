"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completedReservation =
  exports.cancelReservation =
  exports.confirmReservation =
  exports.reservation =
    void 0;
const Response_1 = require("../utils/Response");
const restaurant_services_1 = require("../services/restaurant.services");
const tableReservation_services_1 = require("../services/tableReservation.services");
const table_model_1 = require("../models/table.model");
const reservation = async (req, res) => {
  const user = req.user._id.toString();
  const { restaurant, date, time, guests } = req.body;
  const date1 = `${date}T${time}`;
  const startTime = new Date(date1);
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
    return (0, Response_1.errorResponse)(res, 404, "Restaurant Not Found!");
  }
  if (restaurantRes.capacity < guests) {
    return (0, Response_1.errorResponse)(
      res,
      503,
      "Sorry we dont have capacity now",
    );
  }
  const minutesToAdd = 90;
  const millisecondsToAdd = minutesToAdd * 60 * 1000;
  const endTime = new Date(startTime.getTime() + millisecondsToAdd);
  console.log(endTime, "endTime");
  if (startTime >= endTime) {
    return (0, Response_1.errorResponse)(res, 400, "Invalid time range");
  }
  const available = await (0, tableReservation_services_1.isTableAvailable)(
    restaurant,
    startTime,
    endTime,
  );
  if (available) {
    return (0, Response_1.errorResponse)(
      res,
      409,
      "Table already booked for this time",
    );
  }
  const table = await (0, tableReservation_services_1.createReservation)(
    user,
    restaurant,
    startTime,
    endTime,
    guests,
  );
  if (!table) {
    return (0, Response_1.errorResponse)(
      res,
      404,
      "Error In Table Reservation",
    );
  }
  return (0, Response_1.response)(res, 200, "Table Reserved", table);
};
exports.reservation = reservation;
const confirmReservation = async (req, res) => {
  const reservationId = req.params.id;
  if (!reservationId) {
    return (0, Response_1.errorResponse)(
      res,
      404,
      "please provide reservation id to approve it",
    );
  }
  const table = await (0, tableReservation_services_1.findReservationById)(
    reservationId,
  );
  if (table) {
    table.status = table_model_1.TABLE_STATUS.CONFIRMED;
    await table.save();
  }
  return (0, Response_1.response)(res, 200, "Reservation Confirmed", []);
};
exports.confirmReservation = confirmReservation;
const cancelReservation = async (req, res) => {
  const reservationId = req.params.id;
  if (!reservationId) {
    return (0, Response_1.errorResponse)(
      res,
      404,
      "please provide reservation id to approve it",
    );
  }
  const table = await (0, tableReservation_services_1.findReservationById)(
    reservationId,
  );
  if (table) {
    table.status = table_model_1.TABLE_STATUS.CANCELLED;
    await table.save();
  }
  return (0, Response_1.response)(res, 200, "Reservation Cancelled", []);
};
exports.cancelReservation = cancelReservation;
const completedReservation = async (req, res) => {
  const reservationId = req.params.id;
  if (!reservationId) {
    return (0, Response_1.errorResponse)(
      res,
      404,
      "please provide reservation id to approve it",
    );
  }
  const table = await (0, tableReservation_services_1.findReservationById)(
    reservationId,
  );
  if (table) {
    table.status = table_model_1.TABLE_STATUS.COMPLETED;
    await table.save();
    const rest = (0, restaurant_services_1.updateCapacity)(
      table.restaurant.toString(),
      table.guests,
    );
    console.log(rest);
  }
  return (0, Response_1.response)(res, 200, "Reservation Completed", []);
};
exports.completedReservation = completedReservation;
