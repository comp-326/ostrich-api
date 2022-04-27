import { ExpressError } from '@ostrich-common/errors/ExpressError';
import { IUserRepository } from '../interfaces';

export default function makeRequestAccountActivation({
	userDB
}: {
	userDB: IUserRepository;
}) {
	return async function requestAccountActivation(email: string) {
		if (!email) {
			throw new ExpressError({
				message: 'Please provide an email',
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
		if (existing.isActive) {
			throw new ExpressError({
				message: 'User is already active',
				statusCode: 400,
				data: {},
				status: 'warning'
			});
		}
		return existing;
	};
}
