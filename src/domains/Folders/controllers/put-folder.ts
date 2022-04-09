import { IFolderRequest } from "../interfaces"
import { editFolderUseCase } from "../use-cases"

export default function makeBuildUpdateByIdFolderController({
	update,
}: {
	update: typeof editFolderUseCase
}) {
	return async function (httpRequest: IFolderRequest) {
		const { id } = httpRequest.params
		if (!id) {
			return { statusCode: 400, body: "id required" }
		}
		const folder = await update(id, httpRequest.body)
		return { statusCode: 200, body: {folder} }
	}
}
