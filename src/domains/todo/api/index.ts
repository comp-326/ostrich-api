import { makeNewTodoApiCall } from "./new-todo-api"
import { makeQueryIdTodoApiCall } from "./get-todo-by-id-api"
import { makeQueryTitleTodoApiCall } from "./get-todo-by-title-api"
import { makeQueryTodoApiCall } from "./get-todo-api"
import { makeUpdateTodoApiCall } from "./update-todo-api"
import { makeDeleteTodoApiCall } from "./delete-todo-api"

export default Object.freeze({
	makeDeleteTodoApiCall,
	makeNewTodoApiCall,
	makeQueryIdTodoApiCall,
	makeQueryTitleTodoApiCall,
	makeQueryTodoApiCall,
	makeUpdateTodoApiCall,
})
