import { ExpressError } from "@base/src/common/ExpressError"
import validateMongodbId from "@base/src/utils/mongo/ObjectId-validator"
import createTodo from "../entities"
import { ITodo, ITodoRepository } from "../interfaces"

export default function makeEditTodo({ todoDb }: { todoDb: ITodoRepository }) {
	return async function editTodo(id: string, data: ITodo) {
		if (!id) {
			throw new ExpressError("Please provide an id", 400)
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError("Please provide a valid todo id", 400)
		}
		const existing = await todoDb.findById(id)
		if (!existing) {
			throw new ExpressError("Todo does not exist", 404)
		}
		const todo = createTodo({ ...existing, ...data })
		const edited = await todoDb.updateById(id, {
			title: todo.getTitle(),
			body: todo.getBody(),
			done: todo.getDone(),
			scheduledDate: todo.getScheduleDate(),
			author: todo.getAuthor(),
		})

		return { ...existing._doc, ...edited }
	}
}
