import { ExpressError } from "@base/src/common/ExpressError"
import { TodoValidate } from "."
import { ITodo } from "../interfaces"

export default function makeCreateTodo({
	isValidTitle,
	isValidBody,
}: TodoValidate) {
	return function createTodo({
		author,
		body,
		done,
		scheduledDate,
		title,
	}: ITodo) {
		if (!isValidTitle(title)) {
			throw new ExpressError("Please provide todo title", 400)
		}
		if (!isValidBody(body)) {
			throw new ExpressError("Please provide todo body", 400)
		}
		if (!author) {
			throw new ExpressError("Please provide an author", 400)
		}
		const date = new Date(scheduledDate)
		if (typeof date !== "object") {
			throw new ExpressError("Invalid date format", 400)
		}

		return Object.freeze({
			getTitle: () => title,
			getBody: () => body,
			getDone: () => done,
			getScheduleDate: () => date,
			getAuthor: () => author,
		})
	}
}
