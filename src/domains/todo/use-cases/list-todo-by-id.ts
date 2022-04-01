import { ExpressError } from "@base/src/common/ExpressError"
import validateMongodbId from "@root/utils/mongo/ObjectId-validator"
import { ITodoRepository } from "../interfaces"

export default function makeListTodoById({
	todoDb,
}: {
	todoDb: ITodoRepository
}) {
	return async function listTodoById(id: string) {
		if (!id) {
			throw new ExpressError("Id required",400)
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError("Invalid todo id",400)
		}
		const existing = await todoDb.findById(id)
		if (!existing) {
			throw new ExpressError("Todo not found",404)
		}
		return existing
	}
}
