import { ExpressError } from '@ostrich-common/errors/ExpressError';
import validateMongodbId from '@ostrich-utils/mongo/ObjectId-validator';
import { IUserRepository } from '../interfaces';

export default function makeRemoveUserUseCase({
	userDB
}: {
	userDB: IUserRepository;
}) {
	return async function removerUserUseCase(id: string) {
		if (!id) {
			throw new ExpressError({
				message: 'Please provide an id',
				statusCode: 400,
				data: {},
				status: 'warning'
			});
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				message: 'Please provide a valid user id',
				statusCode: 400,
				data: {},
				status: 'warning'
			});
		}
		const exist = await userDB.findById(id);
		if (!exist) {
			throw new ExpressError({
				message: 'User does not exist',
				statusCode: 404,
				data: {},
				status: 'warning'
			});
		}
		await userDB.deleteById(id);
		return { deleted: true, id, error: 'User deleted succesfully' };
	};
}
