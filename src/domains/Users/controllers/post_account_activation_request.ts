import { mailTransport } from '@ostrich-services/MailService';
import 'reflect-metadata';
import { IUserRequest } from '../interfaces';
import { requestAccountActivation } from '../use-cases';
import UserAccountMailer from '../utils/mail/UserAccountMailer';

export default function makeBuildPostRequestAccountActivationController({
	requestActivation
}: {
	requestActivation: typeof requestAccountActivation;
}) {
	return async function postAccountActivationRequest(
		httpRequest: IUserRequest
	) {
		const user = await requestActivation(httpRequest.body.email);
		if (user) {
			const sendLink = await UserAccountMailer.sendEmailActivationLink({
				mailer: mailTransport
			})({ ...user });
			if (sendLink)
				return {
					statusCode: 200,
					body: {
						message: 'Check your email to activate your account'
					}
				};
		}
		return {
			statusCode: 400,
			body: { message: 'Something went wrong' }
		};
	};
}
