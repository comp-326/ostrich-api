import { IUserRequest } from '@ostrich-domains/Users/interfaces';
import { requestAccountActivation } from '@ostrich-domains/Users/use-cases';

export default function makeBuildPostRequestAccountActivationController({
	requestActivation
}: {
	requestActivation: typeof requestAccountActivation;
}){
	return async function postAccountActivationRequest(
		httpRequest: IUserRequest
	){
		const sent = await requestActivation(httpRequest.body.email);
		if (sent) {
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
