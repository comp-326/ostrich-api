import { NextFunction, Response } from 'express';
import { IRequest } from './../types/request.d';
class Service {
    func = async (req: IRequest, res: Response, next: NextFunction) => { }
}

export default Service