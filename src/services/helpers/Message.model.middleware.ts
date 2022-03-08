import { NextFunction, Response } from 'express';
import { IRequest } from './../../types/request.d';
class MessageModelMiddleware {
    func = async (req: IRequest, res: Response, next: NextFunction) => { }
}

export default MessageModelMiddleware