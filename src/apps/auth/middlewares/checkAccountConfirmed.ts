import { NextFunction, Request, Response } from "express";
import User from "./../../../models/User.Model";

const checkAccountConfirmed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    const { password, ...others } = existingUser!._doc;
    if (existingUser) {
      return res.status(200).json({ user: others });
    } else {
      return res.status(404).json({ error: "Account does not exist" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default checkAccountConfirmed;
