import { IFolderRepository } from "../interfaces"

export default function makeListFoldersUseCase({
	folderDB,
}: {
	folderDB: IFolderRepository
}) {
	return async function listFoldersUseCase(limit: number, page: number) {
		const todos = await folderDB.find(limit, page)
		return todos
	}
}
