import { ExpressError } from "@base/src/common/errors/ExpressError"
import validateMongodbId from "@base/src/utils/mongo/ObjectId-validator"
import createFolder from "../entities"
import { IFolderRepository } from "../interfaces"

export default function makeCopyFolderUseCase({
	folderDB,
}: {
	folderDB: IFolderRepository
}) {
	return async function copyFolderUseCase(
		destinationWorkspaceId: string,
		folderId: string,
	) {
		if (!destinationWorkspaceId) {
			throw new ExpressError("Please provide an id", 400)
		}
		if (!validateMongodbId(destinationWorkspaceId)) {
			throw new ExpressError("Please provide a valid workspace id", 400)
		}
		if (!folderId) {
			throw new ExpressError("Please provide an id", 400)
		}
		if (!validateMongodbId(folderId)) {
			throw new ExpressError("Please provide a valid folder id", 400)
		}
		const existingWorkspace = await folderDB.findWorkspaceById(
			destinationWorkspaceId,
		)
		if (!existingWorkspace) {
			throw new ExpressError("Workspace does not exist", 404)
		}
		const existingFolder = await folderDB.findById(folderId)
		if (!existingFolder) {
			throw new ExpressError("Folder does not exist", 404)
		}
		const folder = createFolder({ ...existingFolder })
		const copiedFolder = await folderDB.createFolder(
			destinationWorkspaceId,
			{
				address: folder.getAddress(),
				comments: folder.getComments(),
				finance: folder.getFinances(),
				images: folder.getImages(),
				isStandout: folder.getIsStandout(),
				likes: 0,
				name: folder.getName(),
				prompts: folder.getPrompts(),
				size: folder.getSize(),
				type: folder.getType(),
				views: 0,
			},
		)

		return copiedFolder
	}
}
