import { IWorkspaceEntity } from "../interfaces"
import { ExpressError } from "@base/src/common/errors/ExpressError"

export default function makeCreateWorkspaceEntity() {
	return function createWorkspace({
		name,
		owner,
		type,
		logo,
	}: IWorkspaceEntity) {
		if (!name) {
			throw new ExpressError("Workspace name required", 400)
		}
		if (!type) {
			throw new ExpressError("Workspace type required", 400)
		}
		if (!owner) {
			throw new ExpressError("Workspace owner", 400)
		}

		return {
			getName: () => name,
			getType: () => type,
			getOwner: () => owner,
			getLogo: () => logo,
		}
	}
}
