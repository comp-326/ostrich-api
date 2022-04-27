import TokenGEN from '@ostrich-helpers/tokenGEN';
import { IAuthRequest } from '@ostrich-domains/Auth/interfaces';
import { loginUserUseCase } from '@ostrich-domains/Auth/use-cases';

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
