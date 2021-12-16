import { NextFunction, Request, Response } from "express";
import checkPassswordError from "./checkPawwordError";

const checkPasswordRegex = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, errors } = checkPassswordError(req.body.password);
  if (error) {
    return res.status(401).json({ errors });
  }
  return next();
};

export default checkPasswordRegex;
