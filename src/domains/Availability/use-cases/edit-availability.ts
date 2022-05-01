import { ExpressError } from '@ostrich-common/errors/ExpressError';
import validateMongodbId from '@ostrich-utils/mongo/ObjectId-validator';
import createAvailability from '../entities';
import { IAvailability, IAvailabilityRepository } from '../interfaces';

export default function makeEditAvailabilityUseCase({
	availabilityDB
}: {
	availabilityDB: IAvailabilityRepository;
}) {
	return async function editAvailabilityUseCase(
		id: string,
		data: IAvailability
	) {
		if (!id) {
			throw new ExpressError({
				message: 'Please provide availability id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				message: 'Please provide a valid availability id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		const existing = await availabilityDB.findById(id);
		if (!existing) {
			throw new ExpressError({
				message: 'Availability does not exist',
				data: {},
				status: 'warning',
				statusCode: 404
			});
		}
		const availability = createAvailability({ ...existing, ...data });
		const edited = await availabilityDB.updateById(id, {
			days: availability.getDays(),
			endTime: availability.getEndTime(),
			startTime: availability.getStartTime()
		});

		return { ...existing._doc, ...edited };
	};
}
