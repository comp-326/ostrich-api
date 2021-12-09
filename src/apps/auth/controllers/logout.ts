import { NextFunction, Request, Response } from "express";

const logout = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Logout route" });
};

export default logout;
