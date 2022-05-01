import { ExpressError } from '@ostrich-common/errors/ExpressError';
import validateMongodbId from '@ostrich-utils/mongo/ObjectId-validator';
import createFolder from '../entities';
import { IFolder, IFolderRepository } from '../interfaces';

export default function makeEditFolderUseCase({
	folderDB
}: {
	folderDB: IFolderRepository;
}) {
	return async function editFolderUseCase(id: string, data: IFolder) {
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
		const folder = createFolder({ ...existing, ...data });
		const edited = await folderDB.updateById(id, {
			address: folder.getAddress(),
			comments: folder.getComments(),
			finance: folder.getFinances(),
			images: folder.getImages(),
			isStandout: folder.getIsStandout(),
			likes: folder.getLikes(),
			name: folder.getName(),
			prompts: folder.getPrompts(),
			size: folder.getSize(),
			type: folder.getType(),
			views: folder.getViews()
		});

		return { ...existing._doc, ...edited };
	};
}
