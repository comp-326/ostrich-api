/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { listWorkspaces } from "../use-cases"
import { IRequest } from "@root/common/types"

export default function makeBuildGetWorkspaceController({
	get,
}: {
	get: typeof listWorkspaces
}) {
	return async function (httpRequest: IRequest) {
		const { limit, page } = httpRequest.query
		const workspaces = await get(Number(limit)!, Number(page))
		if (workspaces.length < 1) {
			return { statusCode: 404, body: { errorMessage: "Nod data" } }
		}
		return { statusCode: 200, body: { workspaces } }
	}
}
