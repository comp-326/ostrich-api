import { IUserRequest } from '../interfaces';
import { activateUserUseCase } from '../use-cases';

export default function makeBuildActivateUserController({
	update
}: {
	update: typeof activateUserUseCase;
}) {
	return async function (httpRequest: IUserRequest) {
		const { id } = httpRequest.params;

		const user = await update(id, httpRequest.body);
		return { statusCode: 200, body: { user } };
	};
}
