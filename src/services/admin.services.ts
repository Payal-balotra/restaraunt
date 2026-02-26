// import { Order } from "../models/order.model";
import { Order } from "../models/order.model";
import { Restaurant } from "../models/restaurant.model";
import { Review } from "../models/review.model";
import { Reservation } from "../models/table.model";
import { User } from "../models/user.model";
import { findUserById } from "./user.services";

export const blockUser = async (userId: string) => {
  const user = await findUserById(userId);
  if (user) {
    user.isActive = false;
    await user.save();
  }
  return true;
};

export const capacityCheck = () => {
  const result = Restaurant.find({}, { name: 1, capacity: 1, _id: 0 });
  return result;
};

export const countUsers = () => {
  const result = User.aggregate([
    {
      $group: { _id: "$role", count: { $sum: 1 } },
    },
  ]);
  return result;
};

export const totalOrders = () => {
  const result = Order.aggregate([
    {
      $group: { _id: "$restaurant", totalOrders: { $sum: 1 } },
    },
    {
      $lookup: {
        from: "restaurants",
        localField: "_id",
        foreignField: "_id",
        as: "restaurantDetails",
      },
    },
    {
      $unwind: "$restaurantDetails",
    },
    {
      $project: {
        _id: 0,
        totalOrders: 1,
        restaurantName: "$restaurantDetails.name",
      },
    },
  ]);

  return result;
};

export const totalReservation = () => {
  const result = Reservation.aggregate([
    {
      $group: { _id: "$restaurant", totalReservations: { $sum: 1 } },
    },
    {
      $lookup: {
        from: "restaurants",
        localField: "_id",
        foreignField: "_id",
        as: "reservationDetails",
      },
    },
    {
      $unwind: "$reservationDetails",
    },
    {
      $project: {
        _id: 0,
        restarurnatName: "$reservationDetails.name",
        totalReservations: 1,
      },
    },
  ]);

  return result;
};

export const averageRating = () => {
  const result = Review.aggregate([
    {
      $group: { _id: "$restaurant", averageRating: { $avg: "$rating" } },
    },
    {
      $lookup: {
        from: "restaurants",
        localField: "_id",
        foreignField: "_id",
        as: "restaurnatDetails",
      },
    },
    {
      $unwind: "$restaurnatDetails",
    },
    {
      $project: {
        _id: 0,
        restarurnatName: "$restaurnatDetails.name",
        averageRating: 1,
      },
    },
  ]);
  return result;
};
