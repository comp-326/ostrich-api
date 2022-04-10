import { ExpressError } from "@base/src/common/errors/ExpressError"
import validateMongodbId from "@root/utils/mongo/ObjectId-validator"
import { IAvailabilityRepository } from "../interfaces"

export default function makeRemoveAvailabilityUseCase({
	availabilityDB,
}: {
	availabilityDB: IAvailabilityRepository
}) {
	return async function removerAvailabilityUseCase(id: string) {
		if (!id) {
			throw new ExpressError("Please provide availability id", 400)
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError("Invalid availability id", 400)
		}
		const exist = await availabilityDB.deleteById(id)
		if (!exist) {
			return { deleted: false, id, error: "User does not exist" }
		}
		await availabilityDB.deleteById(id)
		return { deleted: true, id, error: "User deleted succesfully" }
	}
}
