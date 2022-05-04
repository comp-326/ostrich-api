import { ExpressError } from '@ostrich-common/errors/ExpressError';
import validateMongodbId from '@ostrich-utils/mongo/ObjectId-validator';
import { IUserRepository } from '../interfaces';

export default function makeListUserByIdUseCase({
	userDB
}: {
	userDB: IUserRepository;
}){
	return async function listTodoByIdUseCase(id: string){
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
		const existing = await userDB.findById(id);
		if (!existing) {
			throw new ExpressError({
				message: 'User does not exist',
				statusCode: 404,
				data: {},
				status: 'warning'
			});
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = existing._doc;
		return user;
	};
}
