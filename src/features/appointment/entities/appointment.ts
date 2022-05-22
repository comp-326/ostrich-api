/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IAppointment } from '../models/interfaces';
import moment from 'moment';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';

export default function makeCreateAppointmentEntity() {
	return ({ attendees, description, endTime, expectedAttendees, location, meetingLength, meetingLink, owner, startTime, status, title }: IAppointment) => {

		if (!attendees)
			attendees = [];

		if (!description) {
			throw new ExpressError({
				message: 'description is required',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		if (!endTime) {
			throw new ExpressError({
				message: 'endTime is required',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		if (!location) {
			throw new ExpressError({
				message: 'location is required',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		if (!startTime) {
			throw new ExpressError({
				message: 'startTime is required',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		if (!title) {
			throw new ExpressError({
				message: 'title is required',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		if (!meetingLink) {
			throw new ExpressError({
				message: 'meetingLink is required',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		if (!owner) {
			throw new ExpressError({
				message: 'appointment holder is required',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		if (!moment(startTime).isValid()) {
			throw new ExpressError({
				message: 'startTime is not valid',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		if (!moment(endTime).isValid()) {
			throw new ExpressError({
				message: 'endTime is not valid',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		if (!moment(startTime).isBefore(endTime)) {
			throw new ExpressError({
				message: 'startTime must be before endTime',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		if (!moment(startTime).isSameOrAfter(moment())) {
			throw new ExpressError({
				message: 'startTime must be after current time',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		if (!validateMongodbId(owner)) {
			throw new ExpressError({
				message: 'owner is not valid',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		if (!meetingLength)
			meetingLength = moment(endTime).diff(moment(startTime), 'minutes');

		if (!status)
			status = 'upcoming';

		expectedAttendees = attendees.length;

		return {
			getAttendees: () => attendees,
			getDescription: () => description,
			getEndTime: () => endTime,
			getExpectedAttendees: () => expectedAttendees,
			getLocation: () => location,
			getMeetingLength: () => meetingLength,
			getMeetingLink: () => meetingLink,
			getOwner: () => owner,
			getStartTime: () => startTime,
			getStatus: () => status,
			getTitle: () => title
		};

	};
}