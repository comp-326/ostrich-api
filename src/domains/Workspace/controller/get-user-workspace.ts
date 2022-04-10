import { listUserWorkspaces } from "../use-cases"
import { IRequest } from "@common/types"

export default function makeBuildGetUserWorkspacesController({
	get,
}: {
	get: typeof listUserWorkspaces
}) {
	return async function (httpRequest: IRequest) {
		const userId = httpRequest.user.userId
		const workspaces = await get(userId)
		if (workspaces.length < 1) {
			return {
				statusCode: 404,
				body: { errorMessage: "You are not a member of any workspace" },
			}
		}
		return { statusCode: 200, body: { workspaces } }
	}
}
