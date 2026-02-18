import { Request, Response } from "express";
import { create, findRestarauntByname } from "../services/restaraunt.services";
import { errorResponse, response } from "../utils/Response";
import catchAsync from "../utils/catchAsync";

export const createRestaraunt = catchAsync(
  async (req: Request, res: Response) => {
    const { name, description, cuisine, images, owner, address, isActive } =
      req.body;

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
      isActive,
    );

    return response(res, 201, "User created successfully", restaraunt);
  },
);
