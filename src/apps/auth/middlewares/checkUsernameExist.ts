import { NextFunction, Request, Response } from "express";
import User from "./../../../models/User.Model";

const checkUsernameExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({error:"Username already exist"});
    } else {
      return next();
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default checkUsernameExist;
