import { NextFunction, Request, Response } from "express";

const checkPasswordConfirmPasswordEqual = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { confirmPassword, password } = req.body;
  if (password !== confirmPassword) {
    return res.status(401).json({error:"Passwords do not match"});
  } else {
    return next();
  }
};

export default checkPasswordConfirmPasswordEqual;
