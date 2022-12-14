/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IAuthRepository } from '../interfaces';
import { IUser } from '@ostrich-app-features/users/models/interfaces';
import passwords from '@ostrich-app/utils/passwords';

type IUserData = { email: string; password: string }

export default function createLoginUseCase({ repository }: { repository: IAuthRepository }) {
	return async (userData: Pick<IUser, keyof IUserData>): Promise<any> => {
		if (!userData.email) {
			throw new ExpressError({
				data: {},
				message: 'Email required',
				status: 'warning',
				statusCode: 400
			});
		}
		if (!userData.password) {
			throw new ExpressError({
				data: {},
				message: 'Password required',
				status: 'warning',
				statusCode: 400
			});
		}
		const user = await repository.getUserByEmail(userData.email);
		if (!user) {
			throw new ExpressError({
				data: {},
				message: 'Account does not exist',
				status: 'warning',
				statusCode: 404
			});
		}
		if (!(await passwords.comparePassword(userData.password, user.password))) {
			throw new ExpressError({
				data: {},
				message: 'Invalid login credentials',
				status: 'warning',
				statusCode: 404
			});
		}
		if (!user.isActive) {
			throw new ExpressError({
				data: {},
				message: 'Account is not active',
				status: 'warning',
				statusCode: 404
			});
		}

		return user._doc;
	};
}