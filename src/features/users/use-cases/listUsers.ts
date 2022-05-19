import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IUserRepository } from '@ostrich-app-features/users/interfaces';

export function makeListUsers({repository}:{repository:IUserRepository}){
	return async ({ limit, offset }: { limit: number; offset: number; }) => {
		const users = await repository.find(limit, offset);
		if (users.length === 0) {
			throw new ExpressError({
				message: 'No users found',
				status: 'warning',
				statusCode: 404,
				data: {
					limit,
					offset
				}
			});
		}

		return users;
	};
}