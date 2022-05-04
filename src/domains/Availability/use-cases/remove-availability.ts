import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';
import { IAvailabilityRepository } from '../interfaces';

export default function makeRemoveAvailabilityUseCase({
	availabilityDB
}: {
	availabilityDB: IAvailabilityRepository;
}){
	return async function removerAvailabilityUseCase(id: string){
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
		const exist = await availabilityDB.deleteById(id);
		if (!exist) {
			throw new ExpressError({
				message: 'Availability does not exist',
				data: {},
				status: 'warning',
				statusCode: 404
			});
		}
		await availabilityDB.deleteById(id);
		return { deleted: true, id, error: 'User deleted succesfully' };
	};
}
