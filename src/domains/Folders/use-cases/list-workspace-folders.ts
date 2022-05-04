import { ExpressError } from '@ostrich-common/errors/ExpressError';
import validateMongodbId from '@ostrich-utils/mongo/ObjectId-validator';
import { IFolderRepository } from '../interfaces';

export default function makeListWorkspaceFoldersUseCase({
	folderDB
}: {
	folderDB: IFolderRepository;
}){
	return async function listWorkspaceFoldersUseCase(
		workspaceId: string,
		limit: number,
		page: number
	){
		if (!page) 
			page = 1;
		
		if (!limit) 
			limit = 10;
		
		if (!workspaceId) {
			throw new ExpressError({
				message: 'Please provide workspace id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!validateMongodbId(workspaceId)) {
			throw new ExpressError({
				message: 'Please provide a valid workspace id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		const existing = await folderDB.findWorkspaceFolders(
			workspaceId,
			limit,
			page
		);
		if (!(existing.length < 1)) {
			throw new ExpressError({
				message: 'Folders does not exist',
				data: {},
				status: 'warning',
				statusCode: 404
			});
		}
		return existing;
	};
}
