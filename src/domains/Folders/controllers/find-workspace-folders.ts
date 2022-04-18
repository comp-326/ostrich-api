import { IFolderRequest } from '../interfaces';
import { listWorkspaceFoldersUseCase } from '../use-cases';

export default function makeBuildFindFoldersController({
	find
}: {
	find: typeof listWorkspaceFoldersUseCase;
}) {
	return async function (httpRequest: IFolderRequest) {
		const { workspaceId } = httpRequest.params;

		const limit: number = httpRequest.query.limit
			? Number(httpRequest.query.limit)
			: 20;
		const page: number = httpRequest.query.page
			? Number(httpRequest.query.page)
			: 1;

		const folders = await find(workspaceId, limit, page);

		if (folders.length > 0) {
			return { statusCode: 200, body: { folders } };
		}
		return { statusCode: 404, body: { folders } };
	};
}
