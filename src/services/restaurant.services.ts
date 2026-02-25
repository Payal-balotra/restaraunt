import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";

export const create = async (
  name: string,
  description: string,
  cuisine: string,
  images: string[],
  owner: string,
  address: string,
  capacity: number,
) => {
  const restaurant = Restaurant.create({
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

export const updateCapacity = async (id: string, num: number) => {
  const restaurant = await findRestaurantById(id);
  if (restaurant) {
    restaurant.capacity += num;
    await restaurant.save();
  }
  return restaurant;
};

export const findItems = (restaurant: string) => {
  const items = Menu.find({ restaurant });

  return items;
};
export const findCountOfItems = (restaurant: string) => {
  const totalCount = Menu.countDocuments({ restaurant });
  return totalCount;
};
