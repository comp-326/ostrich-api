import {
	addTodo,
	editTodo,
	listTodoById,
	listTodoByTitle,
	listTodos,
	removeTodo,
} from "../use-cases"
import makeBuildDeleteTodo from "./delete-todo"
import makeBuildFindById from "./find-by-id"
import makeBuildFindByTitle from "./find-by-title"
import makeBuildFindTodos from "./find-todos"
import makeBuildPostTodo from "./post-todo"
import makeBuildUpdateById from "./update-todo"

const postTodo = makeBuildPostTodo({ create: addTodo })
const putTodo = makeBuildUpdateById({ update: editTodo })
const deleteTodo = makeBuildDeleteTodo({ remove: removeTodo })
const findById = makeBuildFindById({ listById: listTodoById })
const findByTitle = makeBuildFindByTitle({ listByTitle: listTodoByTitle })
const findTodos = makeBuildFindTodos({ find: listTodos })

export default Object.freeze({
	postTodo,
	putTodo,
	deleteTodo,
	findById,
	findByTitle,
	findTodos
})

export { postTodo, putTodo, deleteTodo, findById, findByTitle,findTodos }

export type TodoControllerType =
	| typeof postTodo
	| typeof putTodo
	| typeof deleteTodo
	| typeof findById
	| typeof findByTitle
	| typeof findTodos
