import { IFolderRequest } from '../interfaces';
import { listFoldersUseCase } from '../use-cases';

export default function makeBuildFindFoldersController({
	find
}: {
	find: typeof listFoldersUseCase;
}) {
	return async function (httpRequest: IFolderRequest) {
		const limit: number = httpRequest.query.limit
			? Number(httpRequest.query.limit)
			: 20;
		const page: number = httpRequest.query.page
			? Number(httpRequest.query.page)
			: 1;

		const folders = await find(limit, page);

		if (folders.length > 0) {
			return { statusCode: 200, body: { folders } };
		}
		return { statusCode: 404, body: { folders } };
	};
}
