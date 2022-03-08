import { NextFunction, Response } from 'express';
import { IRequest } from './../../types/request.d';
class AppointmentModelMiddleware {
    func = async (req: IRequest, res: Response, next: NextFunction) => { }
}

export default AppointmentModelMiddleware