import makeCreateTodo from "./todo"

export type TodoValidate = {
	isValidBody: (body: string) => boolean
	isValidTitle: (title: string) => boolean
}
class Validate {
	isValidBody = (body: string) => {
		if (!body) {
			return false
		}
		return true
	}

	isValidTitle = (title: string) => {
		if (!title) {
			return false
		}
		return true
	}
}

const valid = new Validate()
const createTodo = makeCreateTodo({
	isValidBody: valid.isValidBody,
	isValidTitle: valid.isValidTitle,
})

export default createTodo

// export type TodoValidate = typeof Validate
