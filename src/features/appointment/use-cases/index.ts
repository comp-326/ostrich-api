/* eslint-disable @typescript-eslint/no-explicit-any */
import {IAppointment} from '../models/interfaces';
import {  IAppointmentRepository, IAppointmentUseCases } from '../interfaces';

export class AppointmentUseCase implements IAppointmentUseCases{
	constructor(private readonly repository: IAppointmentRepository){}

	createAppointment=async (appointmentData: IAppointment) =>{
		return await this.repository.create(appointmentData);
	};

	cancelAppointment=async (appointmentId: string) =>{
		return await this.repository.cancel(appointmentId);
	};

	updateAppointment=async (appointmentId: string, appointmentData: IAppointment) =>{
		return await this.repository.update(appointmentId, appointmentData);
	};

	getAppointmentById=async (appointmentId: string) =>{
		return await this.repository.getById(appointmentId);
	};

	getAppointments=async (userId:string,limit: number, page: number) =>{
		return await this.repository.getAll(userId,limit, page);
	};

	getAppointmentsByWorkspaceId=async (workspaceId: string, limit: number, page: number) =>{
		return await this.repository.getAllByWorkspaceId(workspaceId, limit, page);
	};

	getAppointmentsByUserId=async (userId: string, limit: number, page: number) =>{
		return await this.repository.getAllByUserId(userId, limit, page);
	};

	getAppointmentsByUserIdAndWorkspaceId=async (userId: string, workspaceId: string, limit: number, page: number) =>{
		return await this.repository.getAllByUserIdAndWorkspaceId(userId, workspaceId, limit, page);
	};

	getAppointmentsByUserIdAndWorkspaceIdAndStatus=async (userId: string, workspaceId: string, status: string, limit: number, page: number) =>{
		return await this.repository.getAllByUserIdAndWorkspaceIdAndStatus(userId, workspaceId, status, limit, page);
	};

	getAppointmentsByUserIdAndStatus=async (userId: string, status: string, limit: number, page: number) =>{
		return await this.repository.getAllByUserIdAndStatus(userId, status, limit, page);
	};

	getUpcomingAppointments=async (userId: string, limit: number, page: number) =>{
		return await this.repository.getUpcomingAppointments(userId, limit, page);
	};

	getPastAppointments=async (userId: string, limit: number, page: number) =>{
		return await this.repository.getPastAppointments(userId, limit, page);
	};

	getCancelledAppointments=async (userId: string, limit: number, page: number) =>{
		return await this.repository.getCancelledAppointments(userId, limit, page);
	};
	
	
}
