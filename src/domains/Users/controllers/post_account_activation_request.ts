import { mailTransport } from '@base/src/Services/MailService';
import 'reflect-metadata';
import { IUserRequest } from '../interfaces';
import { requestAccountActivation } from '../use-cases';
import sendAccountActivationLink from '../utils/mail/sendAccountActivationLink';

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
			const sendLink = await sendAccountActivationLink({
				mailer: mailTransport
			})(user.email, user.firstName, user.lastName, user._id);
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
