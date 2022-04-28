import { ExpressError } from '@ostrich-common/errors/ExpressError';
import createLinks from '@ostrich-helpers/createLinks';
import tokenGenerator from '@ostrich-helpers/tokenGenerator';
import {
	accountActivationEmailTemplate,
	passwordResetEmailTemplate
} from '@ostrich-services/MailService';
import { mailConfig } from '@ostrich/src/config';
import { OstrichMailer } from '@ostrich/src/Services/MailService';

class Accountmailer {
	sendPasswordResetLink = () => {
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
			const template = passwordResetEmailTemplate({
				firstName,
				lastName,
				link
			});

			try {
				const res = await OstrichMailer.sendMail({
					to: email,
					from: mailConfig.EMAIL_ACCOUNT,
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
	sendEmailActivationLink = () => {
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
			const template = accountActivationEmailTemplate({
				firstName,
				lastName,
				link
			});

			try {
				const res = await OstrichMailer.sendMail({
					to: email,
					from: mailConfig.EMAIL_ACCOUNT,
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
