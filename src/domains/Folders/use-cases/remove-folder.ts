import { ExpressError } from "@base/src/common/errors/ExpressError"
import validateMongodbId from "@root/utils/mongo/ObjectId-validator"
import { IFolderRepository } from "../interfaces"

export default function makeRemoveFolderUseCase({
	folderDB,
}: {
	folderDB: IFolderRepository
}) {
	return async function removerFolderUseCase(id: string) {
		if (!id) {
			throw new ExpressError("Please provide user id", 400)
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError("Invalid folder id", 400)
		}
		const exist = await folderDB.findById(id)
		if (!exist) {
			return { deleted: false, id, error: "Folder does not exist" }
		}
		await folderDB.deleteById(id)
		return { deleted: true, id, error: "Folder deleted succesfully" }
	}
}
