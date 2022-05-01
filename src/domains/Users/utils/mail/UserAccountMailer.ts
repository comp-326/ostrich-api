import { ExpressError } from '@ostrich-common/errors/ExpressError';
import createLinks from '@ostrich-helpers/createLinks';
import tokenGenerator from '@ostrich-helpers/tokenGenerator';
import {
	accountActivationEmailTemplate,
	passwordResetEmailTemplate
} from '@ostrich-services/MailService';
import { mailConfig } from '@ostrich/src/config';
import { OstrichMailer } from '@ostrich/src/Services/MailService';
import moment from 'moment';

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
					date: moment(new Date().getTime()).format('LLLL'),
					from: mailConfig.EMAIL_USER,
					sender: 'Ostrich Info',
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
					date: moment(new Date().getTime()).format('LLLL'),
					sender: 'Ostrich Info',
					from: mailConfig.EMAIL_USER,
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
