import { ExpressError } from "@base/src/common/errors/ExpressError"
import validateMongodbId from "@base/src/utils/mongo/ObjectId-validator"
import createAvailability from "../entities"
import { IAvailability, IAvailabilityRepository } from "../interfaces"

export default function makeEditAvailabilityUseCase({
	availabilityDB,
}: {
	availabilityDB: IAvailabilityRepository
}) {
	return async function editAvailabilityUseCase(
		id: string,
		data: IAvailability,
	) {
		if (!id) {
			throw new ExpressError("Please provide an id", 400)
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError(
				"Please provide a valid availability id",
				400,
			)
		}
		const existing = await availabilityDB.findById(id)
		if (!existing) {
			throw new ExpressError("vailability does not exist", 404)
		}
		const availability = createAvailability({ ...existing, ...data })
		const edited = await availabilityDB.updateById(id, {
			days: availability.getDays(),
			endTime: availability.getEndTime(),
			startTime: availability.getStartTime(),
		})

		return { ...existing._doc, ...edited }
	}
}
