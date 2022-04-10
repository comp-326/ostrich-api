import { ExpressError } from "@base/src/common/errors/ExpressError"
import validateMongodbId from "@root/utils/mongo/ObjectId-validator"
import { IFolderRepository } from "../interfaces"

export default function makeListFolderByIdUseCase({
	folderDB,
}: {
	folderDB: IFolderRepository
}) {
	return async function listFolderByIdUseCase(id: string) {
		if (!id) {
			throw new ExpressError("Id required",400)
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError("Invalid folder id",400)
		}
		const existing = await folderDB.findById(id)
		if (!existing) {
			throw new ExpressError("Folder not found",404)
		}
		return existing
	}
}
