import "reflect-metadata"
import { IUserRequest } from "../interfaces"
import { addUserUseCase } from "../use-cases"

export default function makeBuildPostUserController({
	create,
}: {
	create: typeof addUserUseCase
}) {
	
	return async function postTodo(httpRequest: IUserRequest) {
		const todo = await create(httpRequest.body)
		return {
			statusCode: 201,
			body: { todo },
		}
	}
}
