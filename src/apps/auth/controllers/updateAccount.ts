import { NextFunction, Request, Response } from "express";

const updateAccount = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Update account route" });
};

export default updateAccount;
