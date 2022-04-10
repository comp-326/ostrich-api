/* eslint-disable @typescript-eslint/no-explicit-any */
import { IWorkspaceEntity, IWorkspaceRepository } from "../interfaces"
import { ExpressError } from "@common/errors/ExpressError"
import createWorkspace from "../entities"
import validateMongodbId from "@utils/mongo/ObjectId-validator"

export default function makeEditWorkspaceUseCase({
	workspaceDB,
}: {
	workspaceDB: IWorkspaceRepository
}) {
	return async function (id: string, data: IWorkspaceEntity) {
		if (!id) {
			throw new ExpressError("Please provide workspace id", 400)
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError("please provide a valid id", 400)
		}
		const existing = await workspaceDB.findById(id)
		if (!existing) {
			throw new ExpressError("Workspace does not exist", 404)
		}
		const workspace = createWorkspace({ ...existing, ...data })
		const edited = await workspaceDB.updateById(id, {
			name: workspace.getName(),
			type: workspace.getType(),
			owner: workspace.getOwner(),
			logo: workspace.getLogo(),
		})
		return edited
	}
}
