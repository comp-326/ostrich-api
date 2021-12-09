import { NextFunction, Request, Response } from "express";

const checkGenderEmptyField = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { gender } = req.body;
  if (typeof gender === "undefined") {
    return res.status(401).json({ error: "Gender field cannot be empty" });
  } else {
    return next();
  }
};

export default checkGenderEmptyField;
