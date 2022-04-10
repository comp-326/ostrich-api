import { ExpressError } from "@base/src/common/errors/ExpressError"
import { IAvailability, IAvailabilityValidator } from "../interfaces"

export default function makeCreateUserEntity({
	validator,
}: {
	validator: IAvailabilityValidator
}) {
	return function createUser({ days, endTime, startTime }: IAvailability) {
		const { isValiDays } = validator
		if (!isValiDays(days)) {
			throw new ExpressError("Please provide a valid email", 400)
		}
		if (!endTime) {
			throw new ExpressError("End time required required", 400)
		}
		if (!startTime) {
			throw new ExpressError("Start time required", 400)
		}

		return Object.freeze({
			getStartTime: () => startTime,
			getEndTime: () => endTime,
			getDays: () => days,
		})
	}
}
