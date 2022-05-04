import { ExpressError } from '@ostrich-common/errors/ExpressError';
import validateMongodbId from '@ostrich-utils/mongo/ObjectId-validator';
import createFolder from '../entities';
import { IFolderRepository } from '../interfaces';

export default function makeCopyFolderUseCase({
	folderDB
}: {
	folderDB: IFolderRepository;
}){
	return async function copyFolderUseCase(
		destinationWorkspaceId: string,
		folderId: string
	){
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
		const folder = createFolder({ ...existingFolder });
		const copiedFolder = await folderDB.createFolder(destinationWorkspaceId, {
			address: folder.getAddress(),
			comments: folder.getComments(),
			finance: folder.getFinances(),
			images: folder.getImages(),
			isStandout: folder.getIsStandout(),
			likes: 0,
			name: folder.getName(),
			prompts: folder.getPrompts(),
			size: folder.getSize(),
			type: folder.getType(),
			views: 0
		});

		return copiedFolder;
	};
}
