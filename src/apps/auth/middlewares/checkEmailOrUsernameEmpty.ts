import { NextFunction, Request, Response } from "express";

const checkEmailOrUsername = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username } = req.body;
  if (typeof email !== "undefined" || typeof username !== "undefined") {
    return next();
  } else {
    return res
      .status(404)
      .json({ error: "Please provide your email or username" });
  }
};

export default checkEmailOrUsername;
