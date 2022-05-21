/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppointmentModel from '../models';
import {IAppointment} from './../models/interfaces';
import { IAppointmentRepository } from '../interfaces';

class AppointmentRepository implements IAppointmentRepository{
	getAll=async (userId: string, limit: number, page: number) => {
		const appointments = await AppointmentModel.find({
			$or: [
				{ createdBy: userId },
				{ attendees: userId },
			],
		})
			.skip(limit * page)
			.limit(limit)
			.sort({ createdAt: -1 });

		return appointments;
	};

	getById=async (appointmentId: string) => {
		return await AppointmentModel.findById(appointmentId);
	};

	create=async (appointmentData: IAppointment) => {
		return await AppointmentModel.create(appointmentData);
	};

	update=async (appointmentId: string, appointmentData: IAppointment) =>{
		return await AppointmentModel.findByIdAndUpdate(appointmentId, appointmentData, { new: true });
	};

	delete=async (appointmentId: string) => {
		return await AppointmentModel.findByIdAndDelete(appointmentId);
	};

	cancel=async (appointmentId: string) =>{
		return await AppointmentModel.findByIdAndUpdate(appointmentId, { status: 'cancelled' }, { new: true });
	};
	
}

export default new AppointmentRepository();
