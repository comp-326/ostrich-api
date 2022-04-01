/* eslint-disable @typescript-eslint/no-non-null-assertion */
import TodoModel from "@root/models/TodoModel"
import { ITodo, ITodoRepository } from "../interfaces"

class TodoRepository implements ITodoRepository {
	createTodo = async (todo: ITodo) => {
		const newTodo = await TodoModel.create(todo)
		return newTodo
	}
	findByTitle = async (title: string) => {
		const todo = await TodoModel.findByTitle(title)
		return todo
	}
	findById = async (id: string) => {
		const todo = await TodoModel.findById(id)
		return todo
	}
	find = async (limit: number, page: number) => {
		const todos = await TodoModel.find()
			.limit(limit)
			.skip(limit * (page - 1))
		return todos
	}
	updateById = async (id: string, data: ITodo) => {
		const updated = await TodoModel.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true },
		)
		return updated!._doc
	}
	deleteById = async (id: string) => {
		const deleted = await TodoModel.findByIdAndDelete(id)
		return deleted!._doc
	}
}

export default new TodoRepository()
