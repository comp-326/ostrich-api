import { ITodoRequest } from "../interfaces"
import { listTodoByTitle } from "../use-cases"

export default function makeBuildFindByTitle({
	listByTitle,
}: {
	listByTitle: typeof listTodoByTitle
}) {
	return async function (httpRequest: ITodoRequest) {
		const { title } = httpRequest.query
		if (!title) {
			return { statusCode: 400, body: { errorMessage: "Title required" } }
		}
		const todo = await listByTitle(title)
		if (todo) {
			return { statusCode: 200, body: todo }
		}
		return { statusCode: 404, body: { errorMessage: "Todo not found" } }
	}
}
