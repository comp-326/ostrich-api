import { ExpressError } from "@base/src/common/errors/ExpressError"
import { IFolderRepository } from "../interfaces"

export default function makeListFolderBynameUseCase({
	folderDB,
}: {
	folderDB: IFolderRepository
}) {
	return async function listUserByNameUseCase(name: string) {

		if (!name) {
			throw new ExpressError("Name required",400)
		}
		const existing = await folderDB.findByName(name)
		if (!existing) {
			throw new ExpressError("Folder not found",404)
		}
		return existing
	}
}
