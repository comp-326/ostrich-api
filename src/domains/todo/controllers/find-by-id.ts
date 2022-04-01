import { ITodoRequest } from "../interfaces"
import { listTodoById } from "../use-cases"

export default function makeBuildFindById({
	listById,
}: {
	listById: typeof listTodoById
}) {
	return async function (httpRequest: ITodoRequest) {
		const { id } = httpRequest.params

		if (!id) {
			return {
				statusCode: 400,
				body: "id not provided",
			}
		}

		const todo = await listById(id)
		return {
			statusCode: 200,
			body: todo,
		}
	}
}
