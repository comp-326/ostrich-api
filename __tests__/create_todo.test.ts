// import { addTodo } from "../src/domains/todo/use-cases"
import  create  from "./../src/domains/todo/entities"

test("Throw an exception", async () => {
	// const mock = jest.fn()
	expect(() =>
		create({
			author: "",
			body: "",
			done: false,
			title: "",
			scheduledDate: new Date(),
		}),
	).toThrow()
})
