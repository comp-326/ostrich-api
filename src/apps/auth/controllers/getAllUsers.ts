import { NextFunction, Request, Response } from "express";

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Get all users route" });
};

export default getAllUsers;
