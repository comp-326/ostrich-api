import { ExpressError } from '@ostrich-common/errors/ExpressError';
import { IAvailability, IAvailabilityValidator } from '../interfaces';

export default function makeCreateUserEntity({
	validator
}: {
	validator: IAvailabilityValidator;
}){
	return function createUser({ days, endTime, startTime }: IAvailability){
		const { isValiDays } = validator;
		if (!isValiDays(days)) {
			throw new ExpressError({
				message: 'Please provide a valid days',
				statusCode: 400,
				status: 'warning',
				data: {}
			});
		}
		if (!endTime) {
			throw new ExpressError({
				message: 'End time required',
				data: {},
				statusCode: 400,
				status: 'warning'

			});
		}
		if (!startTime) {
			throw new ExpressError({
				message: 'Start time required',
				data: {},
				statusCode: 400,
				status: 'warning'
			});
		}

		return Object.freeze({
			getStartTime: () => startTime,
			getEndTime: () => endTime,
			getDays: () => days
		});
	};
}
