"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userOrderPerRes = exports.blockUser = void 0;
const user_services_1 = require("./user.services");
const blockUser = async (userId) => {
  const user = await (0, user_services_1.findUserById)(userId);
  if (user) {
    user.isActive = false;
    await user.save();
  }
  return true;
};
exports.blockUser = blockUser;
const userOrderPerRes = (restaurantId) => {};
exports.userOrderPerRes = userOrderPerRes;
