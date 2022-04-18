import createAvailability from '../entities';
import { IAvailabilityRepository, IAvailability } from '../interfaces';

export default function makeAddAvailabilityUseCase({
	availabilityDB
}: {
	availabilityDB: IAvailabilityRepository;
}) {
	return async function addAvailabilityUseCase(
		userId: string,
		availabilityInfo: IAvailability
	) {
		const availability = createAvailability(availabilityInfo);
		const created = await availabilityDB.createAvailability(userId, {
			startTime: availability.getStartTime(),
			days: availability.getDays(),
			endTime: availability.getEndTime()
		});
		return created;
	};
}
