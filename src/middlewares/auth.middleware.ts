import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../lib/jwt";
import { errorResponse } from "../utils/Response";


export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");
  
  if (!token) return  errorResponse(res,401,"Access denied")
  try {
   const decoded = verifyJwtToken(token)
    console.log(decoded , "this is decoded");
  //  const user =  findUser(decoded.user_id)
    req.body.user = decoded.user;
    next();
  } catch (error) {
     return  errorResponse(res,401,"Invalid token")
  }
}



