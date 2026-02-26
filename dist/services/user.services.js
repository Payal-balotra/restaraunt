"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById =
  exports.findUserByName =
  exports.findUserById =
  exports.findUserByEmail =
  exports.createUser =
    void 0;
const user_model_1 = require("../models/user.model");
const createUser = async (name, email, password, role, phone) => {
  const user = user_model_1.User.create({ name, email, password, role, phone });
  console.log("user created ");
  return user;
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
  const existingUser = user_model_1.User.findOne({ email });
  return existingUser;
};
exports.findUserByEmail = findUserByEmail;
const findUserById = async (id) => {
  const existingUser = user_model_1.User.findById(id);
  return existingUser;
};
exports.findUserById = findUserById;
const findUserByName = async (name) => {
  const existingUser = user_model_1.User.findOne({ name });
  return existingUser;
};
exports.findUserByName = findUserByName;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateUserById = async (userId, data) => {
  const updatedUser = user_model_1.User.findByIdAndUpdate(userId, data, {
    returnDocument: "after",
  });
  return updatedUser;
};
exports.updateUserById = updateUserById;
