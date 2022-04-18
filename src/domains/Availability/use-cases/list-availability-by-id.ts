import { ExpressError } from '@base/src/common/errors/ExpressError';
import validateMongodbId from '@root/utils/mongo/ObjectId-validator';
import { IAvailabilityRepository } from '../interfaces';

export default function makeListAvailabilityByIdAvailabilityUseCase({
	avaialbilityDB
}: {
	avaialbilityDB: IAvailabilityRepository;
}) {
	return async function listUserVailabilityUseCase(id: string) {
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
		const existing = await avaialbilityDB.findById(id);
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
