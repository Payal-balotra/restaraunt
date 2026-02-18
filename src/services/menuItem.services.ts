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
