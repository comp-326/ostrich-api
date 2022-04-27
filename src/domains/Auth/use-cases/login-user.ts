/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@ostrich-common/errors/ExpressError';
import { IUserData } from '@ostrich-domains/Users/interfaces/IUserData';
import { IAuthRepository } from '@ostrich-domains/Auth/interfaces';

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
		if (!existing.isActive) {
			throw new ExpressError({
				message: 'User account is not activated',
				data: {},
				status: 'warning',
				statusCode: 403
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
		return user as Pick<any,IUserData >;
	};
}
