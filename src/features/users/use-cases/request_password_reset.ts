import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IUserRepository } from '@ostrich-app/features/users/interfaces';
import UserAccountMailer from '@ostrich-app/features/users/utils/mail/UserAccountMailer';

export default function makeRequestPasswordReset({
	userDB
}: {
	userDB: IUserRepository;
}){
	return async function requestPasswordReset(email: string){
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
		await UserAccountMailer.sendPasswordResetLink()({
			_id: existing._id,
			email: existing.email,
			firstName: existing.firstName,
			lastName: existing.lastName
		});
		return existing;
	};
}
