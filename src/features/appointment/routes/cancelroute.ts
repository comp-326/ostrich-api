/* eslint-disable @typescript-eslint/no-unused-vars */
import AppointmentRepository from '../repository';
import { AppointmentUseCase } from '../use-cases';
import AppointmenttController from '../controllers';
import { Router } from 'express';
import { loginRequired } from '@ostrich-app/middlewares/Auth';


export default function cancelRoute(app: Router) {
	return (pathName: string) => {
		const appointmentUseCase = new AppointmentUseCase(AppointmentRepository);
		const controller = new AppointmenttController(appointmentUseCase);
		const appointmentRouter = Router();
		app.use(`${pathName}`, appointmentRouter);
		appointmentRouter.put('/appointment/delete/:id', loginRequired, controller.cancelAppointment);

	};
}