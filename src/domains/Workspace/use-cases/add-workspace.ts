/* eslint-disable @typescript-eslint/no-explicit-any */
import createWorkspace from "../entities"
import { IWorkspaceEntity, IWorkspaceRepository } from "../interfaces"

export default function makeAddUserUseCase({
	workspaceDB,
}: {
	workspaceDB: IWorkspaceRepository
}) {
	return async function addWorkspaceUseCase(workspaceInfo: IWorkspaceEntity) {
		const workspace = createWorkspace(workspaceInfo)
		// const existing = await workspaceDB.findByName(workspace.getName())

		const newWorkspace = await workspaceDB.create({
			name: workspace.getName(),
			owner: workspace.getOwner(),
			type: workspace.getType(),
			logo: workspace.getLogo(),
		})
		return newWorkspace
	}
}
