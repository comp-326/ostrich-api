import { ExpressError } from '@ostrich-common/errors/ExpressError';
import { IUserRepository } from '../interfaces';

export default function makeListUserByEmail({
	userDB
}: {
	userDB: IUserRepository;
}){
	return async function listUserByEmailUseCase(email: string){
		if (!email) {
			throw new ExpressError({
				message: 'Please provide a valid email address',
				statusCode: 400,
				data: {},
				status: 'warning'
			});
		}
		const existing = await userDB.findByEmail(email);
		if (!existing) {
			throw new ExpressError({
				message: 'User does not exist',
				statusCode: 404,
				data: {},
				status: 'warning'
			});
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = existing;
		return user;
	};
}
