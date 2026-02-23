import { Menu } from "../models/menu.model";

export const createMenuItem = async (
  name: string,
  price: number,
  category: string,
  image: string,
  restaurant: string,
  isAvailable: boolean,
) => {
  const item = Menu.create({
    name,
    price,
    category,
    image,
    restaurant,
    isAvailable,
  });
  return item;
};

export const findMenuItemById = async (id: string) => {
  return await Menu.findById(id);
};
export const findMenuItemInRes = async (
  itemId: string,
  restaurantId: string,
) => {
  return await Menu.findOne({
    _id: itemId,
    restaurant: restaurantId,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateMenuItemById = (id: string, data: any) => {
  const updatedMenuItem = Menu.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  return updatedMenuItem;
};

export const deleteMenuItemById = async (id: string) => {
  const deletedItem = Menu.findByIdAndDelete(id);
  return deletedItem;
};
