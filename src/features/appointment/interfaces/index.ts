import { IAppointment } from '../models/interfaces';
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAppointmentRepository {
	[x: string]: any;
	getAll: (userId: string, limit: number, page: number) => Promise<any>;
	getById: (appointmentId: string) => Promise<any>;
	create: (appointmentData: IAppointment) => Promise<any>;
	update: (appointmentId: string, appointmentData: IAppointment) => Promise<any>;
	delete: (appointmentId: string) => Promise<any>;
	cancel: (appointmentId: string) => Promise<any>;

}

export interface IAppointmentUseCases {
	createAppointment: (appointmentData: IAppointment) => Promise<any>;
	cancelAppointment: (appointmentId: string) => Promise<any>
	updateAppointment: (appointmentId: string, appointmentData: IAppointment) => Promise<any>
	getAppointmentById: (appointmentId: string) => Promise<any>
	getAppointments: (userId:string,limit: number, page: number) => Promise<any>
	getAppointmentsByWorkspaceId: (workspaceId: string, limit: number, page: number) => Promise<any>
	getAppointmentsByUserId: (userId: string, limit: number, page: number) => Promise<any>
	getAppointmentsByUserIdAndWorkspaceId: (userId: string, workspaceId: string, limit: number, page: number) => Promise<any>
	getAppointmentsByUserIdAndWorkspaceIdAndStatus: (userId: string, workspaceId: string, status: string, limit: number, page: number) => Promise<any>
	getAppointmentsByUserIdAndStatus: (userId: string, status: string, limit: number, page: number) => Promise<any>
	getUpcomingAppointments: (userId: string, limit: number, page: number) => Promise<any>
	getPastAppointments: (userId: string, limit: number, page: number) => Promise<any>
	getCancelledAppointments: (userId: string, limit: number, page: number) => Promise<any>
}

export interface IAppointmentController {
	createAppointment: (req: IRequest, res: IResponse, next: INext) => Promise<any>;
	cancelAppointment: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	updateAppointment: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getAppointmentById: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getAppointments: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getCancelledAppointments: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getUpcomingAppointments: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getPastAppointments: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getUserAppointments: (req: IRequest, res: IResponse, next: INext) => Promise<any>

}
