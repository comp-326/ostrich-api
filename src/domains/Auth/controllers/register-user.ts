/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAuthRequest } from '../interfaces';
import { registerUserUseCase } from '../use-cases';

export default function makeBuildRegisterUserController({
	create
}: {
	create: typeof registerUserUseCase;
}) {
	return async function registerUser(httpRequest: IAuthRequest) {
		const user = await create(httpRequest.body);

		return {
			statusCode: 201,
			body: {
				user,
				message: 'Please check your email to activate your account'
			}
		};
	};
}
