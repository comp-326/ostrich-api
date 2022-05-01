import { IUserRequest } from '../interfaces';
import { requestPasswordReset } from '../use-cases';

export default function makeBuildPostRequestPasswordResetController({
	requestPassword
}: {
	requestPassword: typeof requestPasswordReset;
}) {
	return async function postPasswordReset(httpRequest: IUserRequest) {
		await requestPassword(httpRequest.body.email);
		return {
			statusCode: 200,
			body: {
				message: 'Check your email to change your password'
			}
		};
	};
}
