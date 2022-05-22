/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppointmentController, IAppointmentUseCases } from '../interfaces';
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';

class AppointmentController implements IAppointmentController {
	constructor(private useCase: IAppointmentUseCases) { }

	createAppointment = async (req: IRequest, res: IResponse, next /* eslint-disable @typescript-eslint/no-explicit-any */: INext) => {
		try {
			req.body.owner=req.user.userId;
			await this.useCase.createAppointment(req.body);

			return res.sendStatus(201);
		} catch (error) {
			return next(error);
		}
	};

	cancelAppointment = async (req: IRequest, res: IResponse, next /* eslint-disable @typescript-eslint/no-explicit-any */: INext) => {
		try {
			await this.useCase.cancelAppointment(req.params.id);

			return res.sendStatus(200);
		} catch (error) {
			return;
		}
	};

	updateAppointment = async (req: IRequest, res: IResponse, next /* eslint-disable @typescript-eslint/no-explicit-any */: INext) => {
		try {
			await this.useCase.updateAppointment(req.params.id, req.body);

			return res.sendStatus(200);
		} catch (error) {
			return;
		}
	};

	getAppointmentById = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			const appointment = await this.useCase.getAppointmentById(req.params.id);

			return res.status(200).json({ data: appointment });
		} catch (error) {
			return;
		}
	};

	getAppointments = async (req: IRequest, res: IResponse, next:
		/* eslint-disable @typescript-eslint/no-explicit-any */
		INext) => {
		try {
			const appointments = await this.useCase.getAppointments(req.user.userId, 20, 1);

			return res.status(200).json({ data: appointments });
		} catch (error) {
			return;
		}
	};

	getCancelledAppointments = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			return res.sendStatus(200);
		} catch (error) {
			return;
		}
	};

	getUpcomingAppointments = async (req: IRequest, res: IResponse /* eslint-disable @typescript-eslint/no-explicit-any */, next: INext) => {
		try {
			return res.sendStatus(200);
		} catch (error) {
			return;
		}
	};

	getPastAppointments = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			return res.sendStatus(200);
		} catch (error) {
			return;
		}
	};

	getUserAppointments = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			return res.sendStatus(200);
		} catch (error) {
			return;
		}
	};


}

export default AppointmentController;
