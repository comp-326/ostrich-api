import { NextFunction, Request, Response } from "express"




export default (req: Request, res: Response, next: NextFunction) => {

    return res.status(200).json({ message: "Success" })
}