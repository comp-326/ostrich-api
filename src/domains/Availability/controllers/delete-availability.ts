import { IUserRequest } from "../interfaces"
import { removeUserUseCase } from "../use-cases"

export default function makeBuildDeleteUserController({
	remove,
}: {
	remove: typeof removeUserUseCase
}) {
	return async function (httpRequest: IUserRequest) {
		const { id } = httpRequest.params
		if (!id) {
			return {
				statusCode: 404,
				body: "User not found",
			}
		}
		await remove(id)
		return {
			statusCode: 200,
			body: { id, deleted: true },
		}
	}
}
