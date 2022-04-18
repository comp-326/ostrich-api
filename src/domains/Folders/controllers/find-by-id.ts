import { IFolderRequest } from '../interfaces';
import { listFolderByIdUseCase } from '../use-cases';

export default function makeBuildFindByIdController({
	listById
}: {
	listById: typeof listFolderByIdUseCase;
}) {
	return async function (httpRequest: IFolderRequest) {
		const { id } = httpRequest.params;

		const todo = await listById(id);
		return {
			statusCode: 200,
			body: todo
		};
	};
}
