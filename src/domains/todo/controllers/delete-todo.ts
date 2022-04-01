import { ITodoRequest } from "../interfaces"
import { removeTodo } from "../use-cases"

export default function makeBuildDeleteTodo({
	remove,
}: {
	remove: typeof removeTodo
}) {
	return async function (httpRequest: ITodoRequest) {
		const { id } = httpRequest.params
		if (!id) {
			return {
				statusCode: 404,
				body: "Todo not found",
			}
		}
		await remove(id)
		return {
			statusCode: 200,
			body: { id, deleted: true },
		}
	}
}
