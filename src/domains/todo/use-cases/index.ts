import TodoRepository from "../TodoRepository"
import makeAddTodo from "./add-todo"
import makeEditTodo from "./edit-todo"
import makeListTodoById from "./list-todo-by-id"
import makeListTodoByTitle from "./list-todo-by-title"
import makeListTodos from "./list-todos"
import makeRemoveTodo from "./remove-todo"

const addTodo = makeAddTodo({ todoDb: TodoRepository })
const listTodoById = makeListTodoById({ todoDb: TodoRepository })
const listTodos = makeListTodos({ todoDb: TodoRepository })
const listTodoByTitle = makeListTodoByTitle({ todoDb: TodoRepository })
const editTodo = makeEditTodo({ todoDb: TodoRepository })
const removeTodo = makeRemoveTodo({ todoDb: TodoRepository })

export default Object.freeze({
	addTodo,
	listTodoById,
	listTodos,
	listTodoByTitle,
	editTodo,
	removeTodo,
})

export {
	addTodo,
	listTodoById,
	listTodos,
	listTodoByTitle,
	editTodo,
	removeTodo,
}

export type TodoUseCasesType =
	| typeof addTodo
	| typeof listTodoById
	| typeof listTodos
	| typeof listTodoByTitle
	| typeof editTodo
	| typeof removeTodo
