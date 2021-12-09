import { NextFunction, Request, Response } from "express";

const checkConfirmPasswordEmpty = (req: Request, res: Response, next: NextFunction) => {

    const { confirmPassword } = req.body;
    if (typeof confirmPassword === "undefined") {
      return res.status(401).json({error:"Please Confirm your password"});
    }
    else{
        return next()
    }
  };

export default checkConfirmPasswordEmpty;
