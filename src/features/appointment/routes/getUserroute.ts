/* eslint-disable @typescript-eslint/no-unused-vars */
import AppointmentRepository from '../repository';
import { AppointmentUseCase } from '../use-cases';
import AppointmenttController from '../controllers';
import { Router } from 'express';
import { loginRequired } from '@ostrich-app/middlewares/Auth';


export default function getUserRoute(app: Router) {
	return (pathName: string) => {
		const appointmentUseCase = new AppointmentUseCase(AppointmentRepository);
		const controller = new AppointmenttController(appointmentUseCase);
		const appointmentRouter = Router();
		app.use(`${pathName}`, appointmentRouter);
		appointmentRouter.put('/appointment/personal', loginRequired, controller.getUserAppointments);

	};
}