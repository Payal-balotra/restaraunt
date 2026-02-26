"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.avaliableServiceToogle =
  exports.deleteMenuItem =
  exports.updateMenuItems =
  exports.createMenuItems =
    void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const menuItem_services_1 = require("../services/menuItem.services");
const Response_1 = require("../utils/Response");
exports.createMenuItems = (0, catchAsync_1.default)(async (req, res) => {
  const { name, price, category, image, restaurant, isAvailable } = req.body;
  const item = await (0, menuItem_services_1.createMenuItem)(
    name,
    price,
    category,
    image,
    restaurant,
    isAvailable,
  );
  return (0, Response_1.response)(
    res,
    201,
    "Menu Item Created Successfully",
    item,
  );
});
exports.updateMenuItems = (0, catchAsync_1.default)(async (req, res) => {
  const data = req.body;
  const menuItemId = req.params.id;
  const menuItem = await (0, menuItem_services_1.findMenuItemById)(menuItemId);
  if (!menuItem) {
    return (0, Response_1.errorResponse)(res, 404, "No Menu Item found");
  }
  const updatedMenuItem = await (0, menuItem_services_1.updateMenuItemById)(
    menuItemId,
    data,
  );
  return (0, Response_1.response)(
    res,
    200,
    "Menu Item Updated Successfully",
    updatedMenuItem,
  );
});
exports.deleteMenuItem = (0, catchAsync_1.default)(async (req, res) => {
  const menuItemId = req.params.id;
  const menuItem = await (0, menuItem_services_1.findMenuItemById)(menuItemId);
  if (!menuItem) {
    return (0, Response_1.errorResponse)(res, 404, "No Menu Item found");
  }
  await (0, menuItem_services_1.deleteMenuItemById)(menuItemId);
  return (0, Response_1.response)(
    res,
    204,
    "Menu Item deleted Successfully",
    [],
  );
});
exports.avaliableServiceToogle = (0, catchAsync_1.default)(async (req, res) => {
  const ItemId = req.params.id;
  if (!ItemId) {
    return (0, Response_1.errorResponse)(
      res,
      404,
      "please provide restaurant id to approve it",
    );
  }
  const item = await (0, menuItem_services_1.findMenuItemById)(ItemId);
  if (item) {
    item.isAvailable = !item.isAvailable;
    await item.save();
  }
  return (0, Response_1.response)(res, 200, "Toggled", []);
});
