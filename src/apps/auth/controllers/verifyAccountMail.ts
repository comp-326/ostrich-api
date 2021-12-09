import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { SECRET_KEY } from "./../../../config";
import User from "./../../../models/User.Model";

dotenv.config();

const verifyAccountmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.params.token;
  if (!token) {
    return res.status(400).json({ message: "Invalid token" });
  }
  try {
    const decoded = jwt.verify(token!, SECRET_KEY!);
    // console.log(decoded);
    if (typeof decoded !== "string") {
      const user = await User.findById(decoded.id);
      if (!user?.confirmed) {
        await user?.updateOne({ confirmed: true }, { new: true });
      }
    }
    return res
      .status(200)
      .json({ message: "Account verified please proceed to login" });
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default verifyAccountmail;
