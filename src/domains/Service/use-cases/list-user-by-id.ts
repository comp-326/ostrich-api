import { ExpressError } from "@base/src/common/errors/ExpressError"
import validateMongodbId from "@root/utils/mongo/ObjectId-validator"
import { IUserRepository } from "../interfaces"

export default function makeListUserByIdUseCase({
	userDB,
}: {
	userDB: IUserRepository
}) {
	return async function listTodoByIdUseCase(id: string) {
		if (!id) {
			throw new ExpressError("Id required",400)
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError("Invalid user id",400)
		}
		const existing = await userDB.findById(id)
		if (!existing) {
			throw new ExpressError("User not found",404)
		}
		return existing
	}
}
