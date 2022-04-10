import { ExpressError } from "@base/src/common/errors/ExpressError"
import validateMongodbId from "@base/src/utils/mongo/ObjectId-validator"
import { IFolderRepository } from "../interfaces"

export default function makeListWorkspaceFoldersUseCase({
	folderDB,
}: {
	folderDB: IFolderRepository
}) {
	return async function listWorkspaceFoldersUseCase(
		workspaceId: string,
		limit: number,
		page: number,
	) {
		if (!page) {
			page = 1
		}
		if (!limit) {
			limit = 10
		}
		if (!workspaceId) {
			throw new ExpressError("workspace required", 400)
		}
		if (!validateMongodbId(workspaceId)) {
			throw new ExpressError("Invalid workspace id", 400)
		}
		const existing = await folderDB.findWorkspaceFolders(
			workspaceId,
			limit,
			page,
		)
		if (!(existing.length < 1)) {
			throw new ExpressError("Folders not found", 404)
		}
		return existing
	}
}
