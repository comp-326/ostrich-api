/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppointmentModel from './../models';
import WorkspaceModel from '../models';
import { IAppointment, IAppointmentRepository } from '../interfaces';

class AppointmentRepository implements IAppointmentRepository{
	findByName = async (name: string) => {
		const folder = await AppointmentModel.findOne({ name });

		return folder;
	};

	findById = async (id: string) => {
		const folder = await AppointmentModel.findById(id);

		return folder;
	};

	findWorkspaceById = async (id: string) => {
		const workspace = await WorkspaceModel.findById(id);

		return workspace;
	};

	find = async (limit: number, page: number) => {
		const folders = await AppointmentModel.find()
			.limit(limit)
			.skip(limit * (page - 1));

		return folders;
	};

	findWorkspaceAppointments = async (
		workspaceId: string,
		limit: number,
		page: number,
	) => {
		const workspaceAppointments = await AppointmentModel.find({
			workspace: workspaceId,
		})
			.limit(limit)
			.skip(limit * (page - 1));

		return workspaceAppointments;
	};

	updateById = async (id: string, data: IAppointment) => {
		const editedAppointment = await AppointmentModel.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true },
		);

		return editedAppointment;
	};

	deleteById = async (id: string) => {
		await AppointmentModel.findByIdAndDelete(id);

		return true;
	};

	comment: (id: string) => Promise<any>;

	like: (userId: string, id: string) => Promise<any>;

	move = async (destinationWorkspace: string, folderId: string) => {
		const movedAppointment = await AppointmentModel.findByIdAndUpdate(folderId, {
			workspace: destinationWorkspace,
		});

		return movedAppointment;
	};

	copy = async (destinationWorkspace: string, folderData: IAppointment) => {
		const copiedAppointment = await AppointmentModel.create({
			...folderData,
			workspace: destinationWorkspace,
		});

		return copiedAppointment;
	};

	createAppointment = async (workspaceId: string, data: IAppointment) => {
		const newAppointment = await AppointmentModel.create({
			...data,
			workspace: workspaceId,
		});

		return newAppointment;
	};
}

export default new AppointmentRepository();
