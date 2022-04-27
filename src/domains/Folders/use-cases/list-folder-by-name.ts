import { ExpressError } from '@ostrich-common/errors/ExpressError';
import { IFolderRepository } from '../interfaces';

export default function makeListFolderBynameUseCase({
	folderDB
}: {
	folderDB: IFolderRepository;
}) {
	return async function listUserByNameUseCase(name: string) {
		if (!name) {
			throw new ExpressError({
				message: 'Please provide folder name',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		const existing = await folderDB.findByName(name);
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
