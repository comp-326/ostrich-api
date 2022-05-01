import { ExpressError } from '@ostrich-common/errors/ExpressError';
import validateMongodbId from '@ostrich-utils/mongo/ObjectId-validator';
import { IFolderRepository } from '../interfaces';

export default function makeRemoveFolderUseCase({
	folderDB
}: {
	folderDB: IFolderRepository;
}) {
	return async function removerFolderUseCase(id: string) {
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
		const exist = await folderDB.findById(id);
		if (!exist) {
			throw new ExpressError({
				message: 'Folder does not exist',
				data: {},
				status: 'warning',
				statusCode: 404
			});
		}
		await folderDB.deleteById(id);
		return { deleted: true, id, error: 'Folder deleted succesfully' };
	};
}
