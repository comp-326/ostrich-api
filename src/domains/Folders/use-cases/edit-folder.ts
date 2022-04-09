import { ExpressError } from "@base/src/common/errors/ExpressError"
import validateMongodbId from "@base/src/utils/mongo/ObjectId-validator"
import createFolder from "../entities"
import { IFolder, IFolderRepository } from "../interfaces"

export default function makeEditFolderUseCase({ folderDB }: { folderDB: IFolderRepository }) {
	return async function editFolderUseCase(id: string, data: IFolder) {
		if (!id) {
			throw new ExpressError("Please provide an id", 400)
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError("Please provide a valid user id", 400)
		}
		const existing = await folderDB.findById(id)
		if (!existing) {
			throw new ExpressError("Folder does not exist", 404)
		}
		const folder = createFolder({ ...existing, ...data })
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
			views: folder.getViews(),
		})

		return { ...existing._doc, ...edited }
	}
}
