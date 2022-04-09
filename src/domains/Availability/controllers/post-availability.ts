import "reflect-metadata"
import { IAvailabilityRequest } from "../interfaces"
import { addAvailabilityUseCase } from "../use-cases"

export default function makeBuildPostUserController({
	create,
}: {
	create: typeof addAvailabilityUseCase
}) {
	return async function postTodo(httpRequest: IAvailabilityRequest) {
		const { userId } = httpRequest.user
		const todo = await create(userId, httpRequest.body)
		return {
			statusCode: 201,
			body: { todo },
		}
	}
}
