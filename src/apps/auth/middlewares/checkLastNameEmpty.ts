import { NextFunction, Request, Response } from "express";

const checkLastNameEmpty = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { lastName } = req.body;
  if (typeof lastName === "undefined") {
    return res.status(401).json({ error: "First name field cannot be empty" });
  } else {
    return next();
  }
};

export default checkLastNameEmpty;
