import { IUserRequest } from "../interfaces"
import { activateUserUseCase } from "../use-cases"

export default function makeBuildActivateUserController({
	update,
}: {
	update: typeof activateUserUseCase
}) {
	return async function (httpRequest: IUserRequest) {
		const { id } = httpRequest.params
		if (!id) {
			return { statusCode: 400, body: "id required" }
		}
		const todo = await update(id, httpRequest.body)
		return { statusCode: 200, body: todo }
	}
}
