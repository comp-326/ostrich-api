import { IUserRequest } from '../interfaces';
import { activateUserUseCase } from '../use-cases';
import { activateUserTokenDecode } from '../utils/activateUserToken';

export default function makeBuildActivateUserController({
	update
}: {
	update: typeof activateUserUseCase;
}) {
	return async function (httpRequest: IUserRequest) {
		const { activationToken } = httpRequest.params;
		const { userId } = activateUserTokenDecode(activationToken);

		const user = await update(userId);
		return { statusCode: 200, body: { user } };
	};
}
