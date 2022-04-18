import { IFolderRequest } from '../interfaces';
import { copyFolderUseCase } from '../use-cases';

export default function makeBuildPutCopyFolderController({
	copy
}: {
	copy: typeof copyFolderUseCase;
}) {
	return async function (httpRequest: IFolderRequest) {
		const { workspaceId, folderId } = httpRequest.params;

		const folder = await copy(workspaceId, folderId);
		return { statusCode: 200, body: { folder } };
	};
}
