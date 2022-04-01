import { ExpressError } from "@base/src/common/ExpressError"
import { ITodoRepository } from "../interfaces"

export default function makeListTodoByTitle({
	todoDb,
}: {
	todoDb: ITodoRepository
}) {
	return async function listTodoByTitle(title: string) {

		if (!title) {
			throw new ExpressError("Id required",400)
		}
		const existing = await todoDb.findByTitle(title)
		if (!existing) {
			throw new ExpressError("Todo not found",404)
		}
		return existing
	}
}
