import { NextFunction, Request, Response } from "express";

const checkEmptyEmailField = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  if (typeof email === "undefined") {
    return res.status(401).json({ error: "Email field cannot be empty" });
  } else {
    return next();
  }
};

export default checkEmptyEmailField;
