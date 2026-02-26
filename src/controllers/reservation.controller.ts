import { Request, Response } from "express";
import { errorResponse, response } from "../utils/Response";
import {
  findRestaurantById,
  updateCapacity,
} from "../services/restaurant.services";
import {
  createReservation,
  findReservationById,
  isTableAvailable,
} from "../services/tableReservation.services";
import { TABLE_STATUS } from "../models/table.model";

export const reservation = async (req: Request, res: Response) => {
  const user = req.user._id.toString();
  const { restaurant, date, time, guests } = req.body;

  const date1 = `${date}T${time}`;
  const startTime = new Date(date1);

  const restaurantRes = await findRestaurantById(restaurant);
  if (!restaurantRes?.isActive) {
    return errorResponse(res, 503, "Restaraunt is not approved by admin yet");
  }
  if (!restaurantRes) {
    return errorResponse(res, 404, "Restaurant Not Found!");
  }
  if (restaurantRes.capacity < guests) {
    return errorResponse(res, 503, "Sorry we dont have capacity now");
  }

  const minutesToAdd = 90;
  const millisecondsToAdd = minutesToAdd * 60 * 1000;

  const endTime = new Date(startTime.getTime() + millisecondsToAdd);
  console.log(endTime, "endTime");

  if (startTime >= endTime) {
    return errorResponse(res, 400, "Invalid time range");
  }

  const available = await isTableAvailable(restaurant, startTime, endTime);
  if (available) {
    return errorResponse(res, 409, "Table already booked for this time");
  }
  const table = await createReservation(
    user,
    restaurant,
    startTime,
    endTime,
    guests,
  );

  if (!table) {
    return errorResponse(res, 404, "Error In Table Reservation");
  }
  return response(res, 200, "Table Reserved", table);
};
export const confirmReservation = async (req: Request, res: Response) => {
  const reservationId = req.params.id as string;
  if (!reservationId) {
    return errorResponse(
      res,
      404,
      "please provide reservation id to approve it",
    );
  }
  const table = await findReservationById(reservationId);
  if (table) {
    table.status = TABLE_STATUS.CONFIRMED;
    await table.save();
  }
  return response(res, 200, "Reservation Confirmed", []);
};
export const cancelReservation = async (req: Request, res: Response) => {
  const reservationId = req.params.id as string;
  if (!reservationId) {
    return errorResponse(
      res,
      404,
      "please provide reservation id to approve it",
    );
  }
  const table = await findReservationById(reservationId);
  if (table) {
    table.status = TABLE_STATUS.CANCELLED;
    await table.save();
  }
  return response(res, 200, "Reservation Cancelled", []);
};
export const completedReservation = async (req: Request, res: Response) => {
  const reservationId = req.params.id as string;
  if (!reservationId) {
    return errorResponse(
      res,
      404,
      "please provide reservation id to approve it",
    );
  }
  const table = await findReservationById(reservationId);

  if (table) {
    table.status = TABLE_STATUS.COMPLETED;
    await table.save();
    const rest = updateCapacity(table.restaurant.toString(), table.guests);
    console.log(rest);
  }
  return response(res, 200, "Reservation Completed", []);
};
