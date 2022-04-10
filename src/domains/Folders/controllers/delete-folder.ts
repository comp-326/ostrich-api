import { IFolderRequest } from "../interfaces"
import { removeFolderUseCase } from "../use-cases"

export default function makeBuildDeleteFolderController({
	remove,
}: {
	remove: typeof removeFolderUseCase
}) {
	return async function (httpRequest: IFolderRequest) {
		const { id } = httpRequest.params
		if (!id) {
			return {
				statusCode: 404,
				body: "Folder not found",
			}
		}
		await remove(id)
		return {
			statusCode: 200,
			body: { id, deleted: true },
		}
	}
}
