import { ExpressError } from "@base/src/common/errors/ExpressError"
import WorkspaceModel from "@base/src/models/Workspace/WorkspaceModel"
import validateMongodbId from "@base/src/utils/mongo/ObjectId-validator"
import createFolder from "../entities"
import { IFolder, IFolderRepository } from "../interfaces"

export default function makeAddFolderUseCase({
	folderDB,
}: {
	folderDB: IFolderRepository
}) {
	return async function addFolderUseCase(
		workspaceId: string,
		folderInfo: IFolder,
	) {
		const folder = createFolder(folderInfo)
		const existing = await folderDB.findByName(folder.getName())
		if (!workspaceId) {
			throw new ExpressError("Please provide workspace id", 400)
		}
		if (!validateMongodbId(workspaceId)) {
			throw new ExpressError("Please provide workspace id", 400)
		}
		const workspace = await WorkspaceModel.findById(workspaceId)
		if (!workspace) {
			throw new ExpressError("Workspace does not exist", 404)
		}
		if (existing) {
			throw new ExpressError("Folder already exist", 400)
		}
		const created = await folderDB.createFolder(workspaceId, {
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
			views: folder.getViews(),
		})
		return created
	}
}
