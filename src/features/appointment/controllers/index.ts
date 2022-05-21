/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppointmentController, IAppointmentUseCases } from '../interfaces';
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';

class AppointmentController implements IAppointmentController{
	constructor(private useCase: IAppointmentUseCases){}

	createAppointment=async (req: IRequest, res: IResponse, next /* eslint-disable @typescript-eslint/no-explicit-any */: INext) => {
		try {
			await this.useCase.createAppointment(req.body);

			return res.sendStatus(200);
		} catch (error) {
			return next(error);
		}
	};

	cancelAppointment=async (req: IRequest, res: IResponse, next /* eslint-disable @typescript-eslint/no-explicit-any */: INext) => {
		try {
			return res.sendStatus(200);
		} catch (error) {
			return; 
		}
	};

	updateAppointment=async (req: IRequest, res: IResponse, next /* eslint-disable @typescript-eslint/no-explicit-any */: INext) => {
		try {
			return res.sendStatus(200);
		} catch (error) {
			return; 
		}
	};

	getAppointmentById=async (req: IRequest, res: IResponse, next: INext) => {
		try {
			return res.sendStatus(200);
		} catch (error) {
			return; 
		}
	};

	getAppointments=async (req: IRequest, res: IResponse, next:
		/* eslint-disable @typescript-eslint/no-explicit-any */
		INext) => {
		try {
			return res.sendStatus(200);
		} catch (error) {
			return; 
		}
	};

	getCancelledAppointments=async (req: IRequest, res: IResponse, next: INext) => {
		try {
			return res.sendStatus(200);
		} catch (error) {
			return; 
		}
	};

	getUpcomingAppointments=async (req: IRequest, res: IResponse /* eslint-disable @typescript-eslint/no-explicit-any */, next: INext) => {
		try {
			return res.sendStatus(200);
		} catch (error) {
			return; 
		}
	};

	getPastAppointments=async (req: IRequest, res: IResponse, next: INext) => {
		try {
			return res.sendStatus(200);
		} catch (error) {
			return; 
		}
	};

	getUserAppointments=async (req: IRequest, res: IResponse, next: INext) => {
		try {
			return res.sendStatus(200);
		} catch (error) {
			return; 
		}
	};


}

export default AppointmentController;
