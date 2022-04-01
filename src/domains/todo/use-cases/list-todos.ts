import { ITodoRepository } from "../interfaces"

export default function makeListTodos({ todoDb }: { todoDb: ITodoRepository }) {
	return async function listTodos(limit: number, page: number) {
		const todos = await todoDb.find(limit, page)
		return todos
	}
}
