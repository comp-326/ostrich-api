/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { daysType, IAvailabilityValidator } from '../interfaces';

class AvailabilityValidator implements IAvailabilityValidator {
	isValiDays = (days: daysType[]) => {
		if (days) {
			if (!Array.isArray(days)) {
				return false;
			}
		}
		return false;
	};
}

export default new AvailabilityValidator();
