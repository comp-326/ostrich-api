import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IUserRepository } from '../interfaces';

export default function makeListUsersUseCase({
	userDB
}: {
	userDB: IUserRepository;
}){
	return async function listUsersUseCase(limit: number, page: number){
		const users = await userDB.find(limit, page);
		if (users.length < 1) {
			throw new ExpressError({
				message: 'No users found',
				statusCode: 404,
				data: {},
				status: 'warning'
			});
		}

		return users;
	};
}
