import { Restaurant } from "../models/restaurant.model";

export const create = async (
  name: string,
  description: string,
  cuisine: string,
  images: string[],
  owner: string,
  address: string,
) => {
  const restaurant = Restaurant.create({
    name,
    description,
    cuisine,
    images,
    owner,
    address,
  });
  console.log("restaurant created");
  return restaurant;
};

export const findrestaurantByname = (name: string) => {
  const existingrestaurant = Restaurant.findOne({ name });
  return existingrestaurant;
};
export const findrestaurantById = (id: any) => {
  const existingrestaurant = Restaurant.findById(id);
  return existingrestaurant;
};

export const updaterestaurantById = (id: any, data: any) => {
  const updatedrestaurant = Restaurant.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  return updatedrestaurant;
};

export const deleterestaurantById = async (id: any) => {
  const deletedRes = Restaurant.findByIdAndDelete(id);
  return deletedRes;
};
