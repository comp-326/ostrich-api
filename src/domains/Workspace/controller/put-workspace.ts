import { editWorkspace } from "../use-cases"
import { IRequest } from "@common/types"
import { ExpressError } from "@common/errors/ExpressError"
import validateMongodbId from "@utils/mongo/ObjectId-validator"

export default function makeBuildPutWorkspaceController({
	update,
}: {
	update: typeof editWorkspace
}) {
	return async function (httpRequest: IRequest) {
		const { id } = httpRequest.params
		if (!id) {
			throw new ExpressError("Please provide workspace is", 402)
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError("Invalid workspace id", 400)
		}
		const user = httpRequest.user
		const workspace = await update(id, {
			owner: user.userId,
			...httpRequest.body,
		})
		return { statusCode: 200, body: { workspace } }
	}
}
