import { IUserRequest } from '../interfaces';
import { listUserByEmailUseCase } from '../use-cases';

export default function makeBuildFindByEmailUserController({
	listByEmail
}: {
	listByEmail: typeof listUserByEmailUseCase;
}) {
	return async function (httpRequest: IUserRequest) {
		
		const { email } = httpRequest.params;
		const user = await listByEmail(email);
		return { statusCode: 200, body: {user} };
	};
}
