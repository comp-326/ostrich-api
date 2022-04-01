import "reflect-metadata"
import { ITodoRequest } from "../interfaces"
import { addTodo } from "../use-cases"

export default function makeBuildPostTodo({
	create,
}: {
	create: typeof addTodo
}) {
	
	return async function postTodo(httpRequest: ITodoRequest) {
		const todo = await create(httpRequest.body)
		return {
			statusCode: 201,
			body: { todo },
		}
	}
}
