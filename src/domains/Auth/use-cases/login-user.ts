import { ExpressError } from '@base/src/common/errors/ExpressError';
import { IAuthRepository } from '../interfaces';

export default function makeLoginUserByUseCase({
	userDB
}: {
	userDB: IAuthRepository;
}) {
	return async function loginUserUseCase(email: string, password: string) {
		if (!email) {
			throw new ExpressError({
				message: 'Email required',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!password) {
			throw new ExpressError({
				message: 'Password required',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}

		const existing = await userDB.findByEmail(email);
		if (!existing) {
			throw new ExpressError({
				message: 'User does not exist',
				data: {},
				status: 'info',
				statusCode: 404
			});
		}
		const { passwordMatch, user } = await userDB.login(email, password);
		if (!passwordMatch) {
			throw new ExpressError({
				message: 'Invalid login details',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		return user;
	};
}
