import { NextFunction, Response } from 'express';
import { IRequest } from './../../types/request.d';
class WorkspaceFormMiddleware {
    func = async (req: IRequest, res: Response, next: NextFunction) => { }
}

export default WorkspaceFormMiddleware