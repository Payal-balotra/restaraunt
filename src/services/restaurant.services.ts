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
export const findRestaurantById = (id: string) => {
  const existingrestaurant = Restaurant.findById(id);
  return existingrestaurant;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updaterestaurantById = (id: string, data: any) => {
  const updatedrestaurant = Restaurant.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  return updatedrestaurant;
};

export const deleterestaurantById = async (id: string) => {
  const deletedRes = Restaurant.findByIdAndDelete(id);
  return deletedRes;
};
