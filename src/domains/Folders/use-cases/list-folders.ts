import { IFolderRepository } from '../interfaces';

export default function makeListFoldersUseCase({
	folderDB
}: {
	folderDB: IFolderRepository;
}) {
	return async function listFoldersUseCase(limit: number, page: number) {
		const folders = await folderDB.find(limit, page);
		return folders;
	};
}
