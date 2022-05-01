import { ExpressError } from '@ostrich-common/errors/ExpressError';
import validateMongodbId from '@ostrich-utils/mongo/ObjectId-validator';
import { IFolderRepository } from '../interfaces';

export default function makeListFolderByIdUseCase({
	folderDB
}: {
	folderDB: IFolderRepository;
}) {
	return async function listFolderByIdUseCase(id: string) {
		if (!id) {
			throw new ExpressError({
				message: 'Please provide folder id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				message: 'Please provide a valid folder id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		const existing = await folderDB.findById(id);
		if (!existing) {
			throw new ExpressError({
				message: 'Folder does not exist',
				data: {},
				status: 'warning',
				statusCode: 404
			});
		}
		return existing;
	};
}
