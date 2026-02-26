// import { Order } from "../models/order.model";
import { findUserById } from "./user.services";

export const blockUser = async (userId: string) => {
  const user = await findUserById(userId);
  if (user) {
    user.isActive = false;
    await user.save();
  }
  return true;
};

// export const userOrderPerRes = (restaurantId : string) =>{

// }
