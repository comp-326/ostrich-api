import { NextFunction, Request, Response } from "express";

const getUserById = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Get user by Id route" });
};

export default getUserById;
