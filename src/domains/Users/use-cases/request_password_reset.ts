import { ExpressError } from '@base/src/common/errors/ExpressError';
import { mailTransport } from '@base/src/Services/MailService';
import { IUserRepository } from '../interfaces';
import UserAccountMailer from '../utils/mail/UserAccountMailer';

export default function makeRequestPasswordReset({
	userDB
}: {
	userDB: IUserRepository;
}) {
	return async function requestPasswordReset(email: string) {
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
		await UserAccountMailer.sendPasswordResetLink({ mailer: mailTransport })({
			_id: existing._id,
			email: existing.email,
			firstName: existing.firstName,
			lastName: existing.lastName
		});
		return existing;
	};
}
