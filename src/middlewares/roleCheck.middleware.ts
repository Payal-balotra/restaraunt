import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/Response";
import { Role } from "../models/user.model";

export const checkSuperAdminRole = (req: any, res: Response, next: NextFunction) => {
  if (req.role !== "super_admin") {
    return errorResponse(res, 401, "Unauthorized User");
  }
  next();
};

export const checkRestarauntOwnerRole = (req: any, res: Response, next: NextFunction)=>{
    if(req.role !== Role.RESTARAUNT_OWNER){
      return errorResponse(res,401,"Unauthorised Error");
    }
    next();
}


