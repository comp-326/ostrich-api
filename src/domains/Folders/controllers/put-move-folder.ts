import { IFolderRequest } from '../interfaces';
import { moveFolderUseCase } from '../use-cases';

export default function makeBuildPutMoveFolderController({
	move
}: {
	move: typeof moveFolderUseCase;
}) {
	return async function (httpRequest: IFolderRequest) {
		const { workspaceId, folderId } = httpRequest.params;

		const folder = await move(workspaceId, folderId);
		return { statusCode: 200, body: { folder } };
	};
}
