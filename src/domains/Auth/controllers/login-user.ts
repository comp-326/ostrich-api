import TokenGEN from '@base/src/helpers/TokenGEN';
import { IAuthRequest } from '../interfaces';
import { loginUserUseCase } from '../use-cases';

export default function makeBuildLoginUserController({
	login
}: {
	login: typeof loginUserUseCase;
}) {
	return async function (httpRequest: IAuthRequest) {
		const { email, password } = httpRequest.body;
		const user = await login(email, password);

		const AuthToken = TokenGEN.generateToken({
			userId: user._id,
			email: user.email
		});

		return { statusCode: 200, AuthToken,body: { user } };
	};
}
