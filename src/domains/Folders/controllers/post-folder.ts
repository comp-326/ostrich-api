import "reflect-metadata"
import { IFolderRequest } from "../interfaces"
import { addFolderUseCase } from "../use-cases"

export default function makeBuildPostFolderController({
	create,
}: {
	create: typeof addFolderUseCase
}) {
	return async function postTodo(httpRequest: IFolderRequest) {
		const { workspaceId } = httpRequest.params
		const folder = await create(workspaceId, httpRequest.body)
		return {
			statusCode: 201,
			body: { folder },
		}
	}
}
