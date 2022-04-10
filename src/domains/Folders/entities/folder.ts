import { ExpressError } from "@base/src/common/errors/ExpressError"
import { IFolder, IFolderValidator } from "../interfaces"

export default function makeCreateFOlderEntity({
	validator,
}: {
	validator: IFolderValidator
}) {
	return function createFolder({
		address,
		comments,
		finance,
		images,
		isStandout,
		likes,
		name,
		prompts,
		size,
		type,
		views,
	}: IFolder) {
		const { isValidFolder } = validator
		if (!isValidFolder(name)) {
			throw new ExpressError("Please provide a valid folder", 400)
		}
		return Object.freeze({
			getName: () => name,
			getComments: () => comments,
			getAddress: () => address,
			getFinances: () => finance,
			getIsStandout: () => isStandout,
			getImages: () => images,
			getLikes: () => likes,
			getPrompts: () => prompts,
			getSize: () => size,
			getType: () => type,
			getViews: () => views,
		})
	}
}
