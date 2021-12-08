import { NextFunction, Request, Response } from "express";

const register = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Register route" });
};

export default register;
