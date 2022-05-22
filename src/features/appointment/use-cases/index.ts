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

		const existing = await this.repository.getByTitle(getTitle());
		if (existing) {
			throw new ExpressError({
				message: 'Appointment with this title already exists',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}

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
		const existingAppointment = await this.repository.getById(appointmentId);
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
		if (!validateMongodbId(appointmentId)) {
			throw new ExpressError({
				message: 'appointmentId is not valid',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		const existingAppointment = await this.repository.getById(appointmentId);
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
		} = createAppointmentEntity({ ...existingAppointment._doc, ...appointmentData });
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

	getAppointmentById = async (appointmentId: string) => {
		return await this.repository.getById(appointmentId);
	};

	getAppointments = async (userId: string, limit: number, page: number) => {
		const appointments = await this.repository.getAll(userId, limit, page);

		if (appointments.length < 1) {
			throw new ExpressError({
				message: 'appointments not found',
				status: 'warning',
				data: {},
				statusCode: 404
			});
		}

		return appointments;
	};


	getUpcomingAppointments = async (userId: string, limit: number, page: number) => {
		const appointments = await this.repository.getWithStatus(userId, 'upcoming', limit, page);

		if (appointments.length < 1) {
			throw new ExpressError({
				message: 'appointments not found',
				status: 'warning',
				data: {},
				statusCode: 404
			});
		}

		return appointments;
	};


	getPastAppointments = async (userId: string, limit: number, page: number) => {
		const appointments = await this.repository.getWithStatus(userId, 'past', limit, page);

		if (appointments.length < 1) {
			throw new ExpressError({
				message: 'appointments not found',
				status: 'warning',
				data: {},
				statusCode: 404
			});
		}

		return appointments;
	};

	getCancelledAppointments = async (userId: string, limit: number, page: number) => {
		const appointments = await this.repository.getWithStatus(userId, 'cancelled', limit, page);

		if (appointments.length < 1) {
			throw new ExpressError({
				message: 'appointments not found',
				status: 'warning',
				data: {},
				statusCode: 404
			});
		}

		return appointments;
	};


}
