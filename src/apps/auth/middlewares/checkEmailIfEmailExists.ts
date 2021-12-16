import { NextFunction, Request, Response } from "express";
import User from "./../../../models/User.Model";

const checkEmailIfEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User email already exist" });
    } else {
      return next();
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default checkEmailIfEmailExists;
