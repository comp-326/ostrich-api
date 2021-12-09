import { NextFunction, Request, Response } from "express";

const checkEmptyUsernameEmpty = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  if (typeof username === "undefined") {
    return res.status(401).json({error:"Username field cannot be empty"});
  }
  else{
      return next()
  }
};

export default checkEmptyUsernameEmpty;
