import { ExpressError } from '@ostrich-common/errors/ExpressError';
import validateMongodbId from '@ostrich-utils/mongo/ObjectId-validator';
import { IAvailabilityRepository } from '../interfaces';

export default function makeListUserAvailabilityUseCase({
	avaialbilityDB
}: {
	avaialbilityDB: IAvailabilityRepository;
}) {
	return async function listUserVailabilityUseCase(userId: string) {
		if (!userId) {
			throw new ExpressError({
				message: 'Please provide user id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!validateMongodbId(userId)) {
			throw new ExpressError({
				message: 'Please provide a valid user id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		const existing = await avaialbilityDB.find(userId);
		if (!existing) {
			throw new ExpressError({
				message: 'Availability does not exist',
				data: {},
				status: 'warning',
				statusCode: 404
			});
		}
		return existing;
	};
}
