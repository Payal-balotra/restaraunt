import { Request, Response } from "express";
import {
  approvalById,
  create,
  deleteRestarauntById,
  findRestarauntById,
  findRestarauntByname,
  updateRestarauntById,
} from "../services/restaraunt.services";
import { errorResponse, response } from "../utils/Response";
import catchAsync from "../utils/catchAsync";

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
    // console.log(data)
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
    await deleteRestarauntById(restarauntId);
    return response(res, 204, "Restaraunt deleted Successfully", []);
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
  if (!restaruant) {
    return errorResponse(res,404,"No restaraunt found");
  }
  approvalById(restarauntId)
  return response(res, 200, "approval", []);
});
