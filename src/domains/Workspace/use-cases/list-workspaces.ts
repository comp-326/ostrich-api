/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from "@common/errors/ExpressError"
import { IWorkspaceRepository } from "../interfaces"
export default function makeListWorkspaceUseCase({
	workspaceDB,
}: {
	workspaceDB: IWorkspaceRepository
}) {
	return async function (limit: number, page: number, query?: any) {
		if (!limit) {
			limit = 20
		}
		if (!page) {
			page = 1
		}
		const workspaces = await workspaceDB.find(limit, page, query)
		if (workspaces.length<1) {
			throw new ExpressError("Workspaces not found", 404)
		}
		return workspaces
	}
}
