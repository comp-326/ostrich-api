import { ExpressError } from "@base/src/common/ExpressError"
import validateMongodbId from "@root/utils/mongo/ObjectId-validator"
import { ITodoRepository } from "../interfaces"

export default function makeRemoveTodo({
	todoDb,
}: {
	todoDb: ITodoRepository
}) {
	return async function removeTodo(id: string) {
		if (!id) {
			throw new ExpressError("Please provide id",400)
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError("Invalid todo id",400)
		}
		const exist = await todoDb.findById(id)
		if (!exist) {
			return { deleted: false, id, error: "Todo does not exist" }
		}
		await todoDb.deleteById(id)
		return { deleted: true, id, error: "Todo deleted succesfully" }
	}
}
