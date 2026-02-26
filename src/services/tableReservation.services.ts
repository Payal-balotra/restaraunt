import { Reservation } from "../models/table.model";
import { findRestaurantById } from "./restaurant.services";

export const createReservation = async (
  user: string,
  restaurant: string,
  startTime: Date,
  endTime: Date,
  guests: number,
) => {
  const reserved = Reservation.create({
    user,
    restaurant,
    startTime,
    endTime,
    guests,
  });

  const restaurantRes = await findRestaurantById(restaurant);
  if (restaurantRes) {
    restaurantRes.capacity = restaurantRes?.capacity - guests;
    await restaurantRes.save();
  }
  return reserved;
};

export const findReservationById = (id: string) => {
  return Reservation.findById(id);
};
export const isTableAvailable = async (
  restaurant: string,
  startTime: Date,
  endTime: Date,
) => {
  const results = await Reservation.findOne({
    restaurant,
    startTime: { $lte: endTime },
    endTime: { $gte: startTime },
  });
  return results;
};
