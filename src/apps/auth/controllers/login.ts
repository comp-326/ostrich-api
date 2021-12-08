import { NextFunction, Request, Response } from "express";

const login = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Login route" });
};

export default login;
