import { Request, Response } from "express";
import {
  create,
  deleteRestarauntById,
  findRestarauntById,
  findRestarauntByname,
  updateRestarauntById,
} from "../services/restaraunt.services";
import { errorResponse, response } from "../utils/Response";
import catchAsync from "../utils/catchAsync";
import { Restaraunt } from "../models/restaraunt.model";

export const createRestaraunt = catchAsync(
  async (req: Request, res: Response) => {
    const { name, description, cuisine, images, owner, address } = req.body;

    const existingRes = await findRestarauntByname(name);
    if (existingRes) {
      return errorResponse(res, 409, "Restaraunt by this name already exist");
    }
    const restaraunt = await create(
      name,
      description,
      cuisine,
      images,
      owner,
      address,
    );

    return response(res, 201, "User created successfully", restaraunt);
  },
);

export const updateRestaraunt = catchAsync(
  async (req: Request, res: Response) => {
    const restarauntId = req.params.id;
    const data = req.body;
    const restaraunt = await findRestarauntById(restarauntId);
    if (!restaraunt) {
      return errorResponse(res, 404, "No restaraunt found");
    }
    const updatedRestaraunt = await updateRestarauntById(restarauntId, data);
    return response(
      res,
      200,
      "Restaraunt Updated Successfully",
      updatedRestaraunt,
    );
  },
);

export const deleteRestaraunt = catchAsync(
  async (req: Request, res: Response) => {
    const restarauntId = req.params.id;
    const restaraunt = await findRestarauntById(restarauntId);
    if (!restaraunt) {
      return errorResponse(res, 404, "No restaraunt found");
    }
   const deletedRes=  await deleteRestarauntById(restarauntId);
    return response(res, 20, "Restaraunt deleted Successfully",deletedRes);
  },
);

export const approval = catchAsync(async (req: Request, res: Response) => {
  const restarauntId = req.params.id;
  if (!restarauntId) {
    return errorResponse(
      res,
      404,
      "please provide restaraunt id to approve it",
    );
  }
  const restaruant = await findRestarauntById(restarauntId);
  if (restaruant) {
    restaruant.isActive = true;
    await restaruant.save();
  }
  return response(res, 200, "approval", []);
});

export const getRestaurants = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;
  const { search, cuisine } = req.query;
  const filter: Record<string, any> = {};
  if (typeof search === "string" && search.trim() !== "") {
    const searchRegex = new RegExp(search, "i");
    filter.$or = [
      { name: searchRegex },
      { description: searchRegex },
      { cuisine: searchRegex },
    ];
  }

  if (typeof cuisine === "string" && cuisine.trim() !== "") {
    filter.cuisine = { $regex: cuisine, $options: "i" };
  }

  const [data] = await Promise.all([
    Restaraunt.find(filter).skip(offset).limit(limit),
  ]);
  return response(res, 200, "Restaurants", data);
};
