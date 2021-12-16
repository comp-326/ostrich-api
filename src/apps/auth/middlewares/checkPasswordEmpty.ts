import { NextFunction, Request, Response } from "express";

const checkPasswordEmpty = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  if (typeof password === "undefined") {
    return res.status(401).json({ error: "Password field cannot be empty" });
  } else {
    return next();
  }
};

export default checkPasswordEmpty;
