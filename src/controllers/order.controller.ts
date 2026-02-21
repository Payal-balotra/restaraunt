import { Request, Response } from "express";
import { findRestaurantById } from "../services/restaurant.services";
import { errorResponse, response } from "../utils/Response";
import { findOrderById, placeOrderService } from "../services/order.services";
import { STATUS } from "../models/order.model";

export const placeOrder = async (req: Request, res: Response) => {
  const { user, restaurant, items } = req.body;
  const restaurantRes = await findRestaurantById(restaurant);
  if (!restaurantRes) {
    return errorResponse(res, 404, "Restaurant not found");
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return errorResponse(res, 400, "Items are required");
  }

  const order = await placeOrderService({
    user,
    restaurant,
    items,
  });
  return response(res, 200, "Order Placed successfully", order);
};

export const acceptOrder = async (req: any, res: Response) => {
  const orderId = req.params.id;
  const order = await findOrderById(orderId);
  if (!order) {
    return errorResponse(res, 404, "Order not found");
  }
  const restaurant = await findRestaurantById(order.restaurant);
  if(!restaurant){
    return errorResponse(res,404,"Restaurant Not Found");
  }
  if(restaurant.owner.toString() !== req.user._id.toString()){
    return errorResponse(res,403,"You are not authorized to accept this order")
  }

  order.status = STATUS.ACCEPTED;
  await order.save();
  return response(res,200,"Order Accepted",order);

};
export const prepareOrder = async (req: any, res: Response) => {
  const orderId = req.params.id;
  const order = await findOrderById(orderId);
  if (!order) {
    return errorResponse(res, 404, "Order not found");
  }
    const restaurant = await findRestaurantById(order.restaurant);
  if(!restaurant){
    return errorResponse(res,404,"Restaurant Not Found");
  }
  if(restaurant.owner.toString() !== req.user._id.toString()){
    return errorResponse(res,403,"You are not authorized to accept this order")
  }
  order.status = STATUS.PREPARING;
  await order.save();
  return response(res,200,"Order preparing",order);

};
export const outForDelivery = async (req: any, res: Response) => {
  const orderId = req.params.id;
  const order = await findOrderById(orderId);
  if (!order) {
    return errorResponse(res, 404, "Order not found");
  }
    const restaurant = await findRestaurantById(order.restaurant);
  if(!restaurant){
    return errorResponse(res,404,"Restaurant Not Found");
  }
  if(restaurant.owner.toString() !== req.user._id.toString()){
    return errorResponse(res,403,"You are not authorized to accept this order")
  }
  order.status = STATUS.OUT_FOR_DELIVERY;
  await order.save();
  return response(res,200,"Order out for delivery",order);

};
export const completedOrder = async (req: any, res: Response) => {
  const orderId = req.params.id;
  const order = await findOrderById(orderId);
  if (!order) {
    return errorResponse(res, 404, "Order not found");
  }
    const restaurant = await findRestaurantById(order.restaurant);
  if(!restaurant){
    return errorResponse(res,404,"Restaurant Not Found");
  }
  if(restaurant.owner.toString() !== req.user._id.toString()){
    return errorResponse(res,403,"You are not authorized to accept this order")
  }
  order.status = STATUS.COMPLETED;
  await order.save();
  return response(res,200,"Order Completed",order);

};
export const cancelOrder = async (req: any, res: Response) => {
  const orderId = req.params.id;
  const order = await findOrderById(orderId);
  if (!order) {
    return errorResponse(res, 404, "Order not found");
  }
    const restaurant = await findRestaurantById(order.restaurant);
  if(!restaurant){
    return errorResponse(res,404,"Restaurant Not Found");
  }
  if(restaurant.owner.toString() !== req.user._id.toString()){
    return errorResponse(res,403,"You are not authorized to accept this order")
  }
  order.status = STATUS.CANCELLED;
  await order.save();
  return response(res,200,"Order Cancelled",order);

};