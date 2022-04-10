import { ExpressError } from "@base/src/common/errors/ExpressError"
import validateMongodbId from "@root/utils/mongo/ObjectId-validator"
import { IUserRepository } from "../interfaces"

export default function makeRemoveUserUseCase({
	userDB,
}: {
	userDB: IUserRepository
}) {
	return async function removerUserUseCase(id: string) {
		if (!id) {
			throw new ExpressError("Please provide user id", 400)
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError("Invalid user id", 400)
		}
		const exist = await userDB.findById(id)
		if (!exist) {
			return { deleted: false, id, error: "User does not exist" }
		}
		await userDB.deleteById(id)
		return { deleted: true, id, error: "User deleted succesfully" }
	}
}
