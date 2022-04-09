import { IFolderRequest } from "../interfaces"
import { listFolderByNameUseCase } from "../use-cases"

export default function makeBuildFindByNameFolderController({
	listByName,
}: {
	listByName: typeof listFolderByNameUseCase
}) {
	return async function (httpRequest: IFolderRequest) {
		const { name } = httpRequest.query
		if (!name) {
			return { statusCode: 400, body: { errorMessage: "Name required" } }
		}
		const folder = await listByName(name)
		if (folder) {
			return { statusCode: 200, body: {folder} }
		}
		return { statusCode: 404, body: { errorMessage: "Folder not found" } }
	}
}
