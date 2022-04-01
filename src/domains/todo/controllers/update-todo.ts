import { ITodoRequest } from "../interfaces"
import { editTodo } from "../use-cases"

export default function makeBuildUpdateById({
	update,
}: {
	update: typeof editTodo
}) {
	return async function (httpRequest: ITodoRequest) {
		const { id } = httpRequest.params
		if (!id) {
			return { statusCode: 400, body: "id required" }
		}
		const todo = await update(id, httpRequest.body)
		return { statusCode: 200, body: todo }
	}
}
