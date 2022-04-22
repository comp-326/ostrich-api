import { IUserRequest } from '../interfaces';
import { requestPasswordReset } from '../use-cases';

export default function makeBuildPostRequestPasswordResetController({
	requestPassword
}: {
	requestPassword: typeof requestPasswordReset;
}) {
	return async function postPasswordReset(httpRequest: IUserRequest) {
		const user = await requestPassword(httpRequest.body.email);
		console.log(user);

		return {
			statusCode: 200,
			body: {
				message: 'Check your email to change your password'
			}
		};
	};
}
