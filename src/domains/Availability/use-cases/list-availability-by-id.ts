import { ExpressError } from "@base/src/common/errors/ExpressError"
import validateMongodbId from "@root/utils/mongo/ObjectId-validator"
import { IAvailabilityRepository } from "../interfaces"

export default function makeListAvailabilityByIdAvailabilityUseCase({
	avaialbilityDB,
}: {
	avaialbilityDB: IAvailabilityRepository
}) {
	return async function listUserVailabilityUseCase(id: string) {
		if (!id) {
			throw new ExpressError("Availability id required",400)
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError("Invalid availability id",400)
		}
		const existing = await avaialbilityDB.findById(id)
		if (!existing) {
			throw new ExpressError("Availability not found",404)
		}
		return existing
	}
}
