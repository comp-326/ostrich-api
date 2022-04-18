import { ExpressError } from '@base/src/common/errors/ExpressError';
import validateMongodbId from '@base/src/utils/mongo/ObjectId-validator';
import { IFolderRepository } from '../interfaces';

export default function makeMoveFolderUseCase({
	folderDB
}: {
	folderDB: IFolderRepository;
}) {
	return async function moveFolderUseCase(
		destinationWorkspaceId: string,
		folderId: string
	) {
		if (!destinationWorkspaceId) {
			throw new ExpressError({
				message: 'Please provide destination workspace id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!validateMongodbId(destinationWorkspaceId)) {
			throw new ExpressError({
				message: 'Please provide a valid destination workspace id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!folderId) {
			throw new ExpressError({
				message: 'Please provide folder id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!validateMongodbId(folderId)) {
			throw new ExpressError({
				message: 'Please provide a valid folder id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		const existingWorkspace = await folderDB.findWorkspaceById(
			destinationWorkspaceId
		);
		if (!existingWorkspace) {
			throw new ExpressError({
				message: 'Destination workspace does not exist',
				data: {},
				status: 'warning',
				statusCode: 404
			});
		}
		const existingFolder = await folderDB.findById(folderId);
		if (!existingFolder) {
			throw new ExpressError({
				message: 'Folder does not exist',
				data: {},
				status: 'warning',
				statusCode: 404
			});
		}
		const movedFolder = await folderDB.move(destinationWorkspaceId, folderId);

		return movedFolder;
	};
}
