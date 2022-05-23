/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppointmentModel from '../models';
import { IAppointment } from './../models/interfaces';
import { IAppointmentRepository } from '../interfaces';

class AppointmentRepository implements IAppointmentRepository {
	getAll = async (userId: string, limit: number, page: number) => {
		return await AppointmentModel.find({
			owner: userId,
		})
			.skip(limit * (page - 1))
			.limit(limit)
			.sort({ createdAt: -1 }).select('-__v');	
	};

	getById = async (appointmentId: string) => {
		const appointment= await AppointmentModel.findById(appointmentId);

		return {...appointment!._doc,_id:appointment!._id.toString(),owner:appointment!.owner.toString()};
	};

	getWithStatus = async (
		userId: string,
		status: IAppointment['status'],
		limit: number,
		page: number,
	) => {
		return await AppointmentModel.find({ owner: userId, status: status })
			.skip(limit * (page - 1))
			.limit(limit)
			.sort({ createdAt: -1 }).select('-__v');
	};

	getByTitle = async (title: string) => {
		return await AppointmentModel.findOne({ title });
	};

	create = async (appointmentData: IAppointment) => {
		return await AppointmentModel.create(appointmentData);
	};

	update = async (appointmentId: string, appointmentData: IAppointment) => {
		return await AppointmentModel.findByIdAndUpdate(
			appointmentId,
			appointmentData,
			{ new: true },
		);
	};

	delete = async (appointmentId: string) => {
		return await AppointmentModel.findByIdAndDelete(appointmentId);
	};

	cancel = async (appointmentId: string) => {
		return await AppointmentModel.findByIdAndUpdate(
			appointmentId,
			{ status: 'cancelled' },
			{ new: true },
		);
	};
}

export default new AppointmentRepository();
