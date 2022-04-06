/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from "@common/errors/ExpressError"
import { IWorkspaceRepository } from "../interfaces"
export default function makeListUserWorkspaceUseCase({
	workspaceDB,
}: {
	workspaceDB: IWorkspaceRepository
}) {
	return async function (id: string) {
		const workspaces = await workspaceDB.findUserWorkspaces(id)
		if (workspaces.length<1) {
			throw new ExpressError("Workspaces not found", 404)
		}
		return workspaces
	}
}
