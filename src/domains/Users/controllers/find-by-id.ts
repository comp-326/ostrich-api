import { IUserRequest } from '../interfaces';
import { listUserByIdUseCase } from '../use-cases';

export default function makeBuildFindByIdController({
	listById
}: {
	listById: typeof listUserByIdUseCase;
}) {
	return async function (httpRequest: IUserRequest) {
		const { id } = httpRequest.params;

		const user = await listById(id);
		return {
			statusCode: 200,
			body:{ user}
		};
	};
}
