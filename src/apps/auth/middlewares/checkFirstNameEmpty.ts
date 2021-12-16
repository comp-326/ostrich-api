import { NextFunction, Request, Response } from "express";

const checkFirstNameEmpty = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName } = req.body;
  if (typeof firstName === "undefined") {
    return res.status(401).json({ error: "First name field cannot be empty" });
  } else {
    return next();
  }
};

export default checkFirstNameEmpty;
