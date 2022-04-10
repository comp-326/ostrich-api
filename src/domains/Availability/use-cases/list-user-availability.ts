import { ExpressError } from "@base/src/common/errors/ExpressError"
import validateMongodbId from "@root/utils/mongo/ObjectId-validator"
import { IAvailabilityRepository } from "../interfaces"

export default function makeListUserAvailabilityUseCase({
	avaialbilityDB,
}: {
	avaialbilityDB: IAvailabilityRepository
}) {
	return async function listUserVailabilityUseCase(userId: string) {
		if (!userId) {
			throw new ExpressError("User id required",400)
		}
		if (!validateMongodbId(userId)) {
			throw new ExpressError("Invalid user id",400)
		}
		const existing = await avaialbilityDB.find(userId)
		if (!existing) {
			throw new ExpressError("User not found",404)
		}
		return existing
	}
}
