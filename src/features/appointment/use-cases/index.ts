/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppointment, IAppointmentRepository, IAppointmentUseCases } from '../interfaces';

export class AppointmentUseCase implements IAppointmentUseCases{
	constructor(private readonly repository: IAppointmentRepository){}

	addAppointment=async (folderData: IAppointment) => {
		await this.repository.comment('');

		await this.repository.createAppointment('',folderData);

		return {};
	};

	copyAppointment=async (folderData: IAppointment) => {
		await this.repository.createAppointment('',folderData);

		return {};
	};

	editAppointment=async (folderData: IAppointment) => {
		await this.repository.createAppointment('',folderData);

		return {};
	};

	listAppointmentById=async (folderData: IAppointment) => {
		await this.repository.createAppointment('',folderData);

		return {};
	};

	listAppointmentByName=async (folderData: IAppointment) => {
		await this.repository.createAppointment('',folderData);

		return {};
	};

	listAppointments=async (folderData: IAppointment) => {
		await this.repository.createAppointment('',folderData);

		return {};
	};

	listWorkspaceAppointments=async (folderData: IAppointment) => {
		await this.repository.createAppointment('',folderData);

		return {};
	};

	moveAppointment=async (folderData: IAppointment) => {
		await this.repository.createAppointment('',folderData);

		return {};
	};

	softRemoveAppointment=async (folderData: IAppointment) => {
		await this.repository.createAppointment('',folderData);

		return {};
	};

	hardRemoveAppointment=async (folderData: IAppointment) => {
		await this.repository.createAppointment('',folderData);

		return {};
	};
	
}
