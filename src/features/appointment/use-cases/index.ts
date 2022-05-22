/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IAppointment } from '../models/interfaces';
import { createAppointmentEntity } from '../entities';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';
import { IAppointmentRepository, IAppointmentUseCases } from '../interfaces';

export class AppointmentUseCase implements IAppointmentUseCases {
	constructor(private readonly repository: IAppointmentRepository) { }

	createAppointment = async (appointmentData: IAppointment) => {
		const { getAttendees, getDescription, getEndTime, getExpectedAttendees, getLocation, getMeetingLength, getMeetingLink, getOwner, getStartTime, getStatus, getTitle } = createAppointmentEntity(appointmentData);

		return await this.repository.create({
			attendees: getAttendees(),
			description: getDescription(),
			endTime: getEndTime(),
			expectedAttendees: getExpectedAttendees(),
			location: getLocation(),
			meetingLength: getMeetingLength(),
			meetingLink: getMeetingLink(),
			owner: getOwner(),
			startTime: getStartTime(),
			status: getStatus(),
			title: getTitle()
		});
	};

	cancelAppointment = async (appointmentId: string) => {
		if (!validateMongodbId(appointmentId)) {
			throw new ExpressError({
				message: 'appointmentId is not valid',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		const existingAppointment = await this.repository.findById(appointmentId);
		if (!existingAppointment) {
			throw new ExpressError({
				message: 'appointment not found',
				status: 'warning',
				data: {},
				statusCode: 404
			});
		}

		const {
			getAttendees, getDescription, getEndTime, getExpectedAttendees, getLocation, getMeetingLength, getMeetingLink, getOwner, getStartTime, getStatus, getTitle
		} = createAppointmentEntity({ ...existingAppointment._doc, status: 'cancelled' });
		const updatedAppointment = await this.repository.update(appointmentId, {
			attendees: getAttendees(),
			description: getDescription(),
			endTime: getEndTime(),
			expectedAttendees: getExpectedAttendees(),
			location: getLocation(),
			meetingLength: getMeetingLength(),
			meetingLink: getMeetingLink(),
			owner: getOwner(),
			startTime: getStartTime(),
			status: getStatus(),
			title: getTitle()
		});

		return updatedAppointment;
	};

	updateAppointment = async (appointmentId: string, appointmentData: IAppointment) => {
		return await this.repository.update(appointmentId, appointmentData);
	};

	getAppointmentById = async (appointmentId: string) => {
		return await this.repository.getById(appointmentId);
	};

	getAppointments = async (userId: string, limit: number, page: number) => {
		return await this.repository.getAll(userId, limit, page);
	};

	getAppointmentsByWorkspaceId = async (workspaceId: string, limit: number, page: number) => {
		return await this.repository.getAllByWorkspaceId(workspaceId, limit, page);
	};

	getAppointmentsByUserId = async (userId: string, limit: number, page: number) => {
		return await this.repository.getAllByUserId(userId, limit, page);
	};

	getAppointmentsByUserIdAndWorkspaceId = async (userId: string, workspaceId: string, limit: number, page: number) => {
		return await this.repository.getAllByUserIdAndWorkspaceId(userId, workspaceId, limit, page);
	};

	getAppointmentsByUserIdAndWorkspaceIdAndStatus = async (userId: string, workspaceId: string, status: string, limit: number, page: number) => {
		return await this.repository.getAllByUserIdAndWorkspaceIdAndStatus(userId, workspaceId, status, limit, page);
	};

	getAppointmentsByUserIdAndStatus = async (userId: string, status: string, limit: number, page: number) => {
		return await this.repository.getAllByUserIdAndStatus(userId, status, limit, page);
	};

	getUpcomingAppointments = async (userId: string, limit: number, page: number) => {
		return await this.repository.getUpcomingAppointments(userId, limit, page);
	};

	getPastAppointments = async (userId: string, limit: number, page: number) => {
		return await this.repository.getPastAppointments(userId, limit, page);
	};

	getCancelledAppointments = async (userId: string, limit: number, page: number) => {
		return await this.repository.getCancelledAppointments(userId, limit, page);
	};


}
