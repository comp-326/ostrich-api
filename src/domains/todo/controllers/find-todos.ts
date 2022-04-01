import { ITodoRequest } from "../interfaces"
import { listTodos } from "../use-cases"

export default function makeBuildFindTodos({
	find,
}: {
	find: typeof listTodos
}) {
	return async function (httpRequest: ITodoRequest) {
		const limit: number = httpRequest.query.limit
			? Number(httpRequest.query.limit)
			: 20
		const page: number = httpRequest.query.page
			? Number(httpRequest.query.page)
			: 1

		const todos = await find(limit, page)

		if (todos.length > 0) {
			return { statusCode: 200, body: { todos } }
		}
		return { statusCode: 404, body: { todos } }
	}
}
