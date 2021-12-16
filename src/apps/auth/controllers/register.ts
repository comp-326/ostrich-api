import User, { accountTypes, userRoles } from "./../../../models/User.Model";
import { NextFunction, Request, Response } from "express";
import passwordHandler from "../middlewares/password.handler";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { password, ...body } = req.body;
    const hashedPassword = await passwordHandler.generatepasswordHash(
      req.body.password,
      10
    );
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      role: userRoles.user,
      accountType: accountTypes.basic,
    });

    const createdUser = await newUser.save();
    const { password, ...other } = createdUser._doc;
    return res.status(200).json({ user: other });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default register;
