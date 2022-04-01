import { ExpressError } from "@base/src/common/ExpressError"
import createTodo from "../entities"
import { ITodo, ITodoRepository } from "../interfaces"

export default function makeAddTodo({ todoDb }: { todoDb: ITodoRepository }) {
	return async function addTodo(todoData: ITodo) {
		const todo = createTodo(todoData)
		const existing = await todoDb.findByTitle(todo.getTitle())
		if (existing) {
			throw new ExpressError("Todo title already exist",400)
		}
		const created = await todoDb.createTodo({
			title: todo.getTitle(),
			body: todo.getBody(),
			done: todo.getDone(),
			scheduledDate: todo.getScheduleDate(),
			author: todo.getAuthor(),
		})
		return created
	}
}
