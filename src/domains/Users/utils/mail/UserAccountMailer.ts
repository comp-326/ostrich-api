import { ExpressError } from '@base/src/common/errors/ExpressError';
import { EMAIL_ACCOUNT } from '@base/src/config';
import createLinks from '@base/src/helpers/createLinks';
import tokenGenerator from '@base/src/helpers/tokenGenerator';
import {
	EmailActivationTemp,
	ForgotPasswordTemp
} from '@base/src/Services/MailService/templates';
import MailerType from '@base/src/Services/MailService/transport';

class Accountmailer {
	sendPasswordResetLink = ({ mailer }: { mailer: typeof MailerType }) => {
		return async function ({
			firstName,
			lastName,
			email,
			_id
		}: {
			email: string;
			firstName: string;
			lastName: string;
			_id: string;
		}) {
			let sent = false;
			const token = tokenGenerator.generatePasswordResetToken({ userId: _id })(
				'24h'
			);

			const link = createLinks.createForgotPasswordLink(token);
			const template = ForgotPasswordTemp({
				firstName,
				lastName,
				link
			});

			try {
				const res = await mailer.sendMail({
					to: email,
					from: EMAIL_ACCOUNT,
					subject: 'Reset your password',
					html: template
				});
				res && (sent = true);
				return sent;
			} catch (err) {
				throw new ExpressError({
					message: err.message,
					data: {},
					status: 'error',
					statusCode: 500
				});
			}
		};
	};
	sendEmailActivationLink = ({ mailer }: { mailer: typeof MailerType }) => {
		return async function ({
			email,
			firstName,
			lastName,
			_id
		}: {
			email: string;
			firstName: string;
			lastName: string;
			_id: string;
		}) {
			let sent = false;
			const token = tokenGenerator.generatePasswordResetToken({ userId: _id })(
				'24h'
			);

			const link = createLinks.createAccountActivationLink({ token });
			const template = EmailActivationTemp({
				firstName,
				lastName,
				link
			});

			try {
				const res = await mailer.sendMail({
					to: email,
					from: EMAIL_ACCOUNT,
					subject: 'Activate your account',
					html: template
				});
				res && (sent = true);
				return sent;
			} catch (err) {
				throw new ExpressError({
					message: err.message,
					data: {},
					status: 'error',
					statusCode: 500
				});
			}
		};
	};
}

export default new Accountmailer();
