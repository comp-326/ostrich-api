/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AvailabilityModel from '@ostrich-app/models/Availability/AvailabilityModel';
import { IAvailability, IAvailabilityRepository } from '../interfaces';

class AvailabilityRepository implements IAvailabilityRepository{
	createAvailability = async (userId: string, data: IAvailability) => {
		const availability = AvailabilityModel.create({ user: userId, data });
		return availability;
	};

	findById = async (id: string) => {
		const availability = await AvailabilityModel.findById(id);
		return availability;
	};

	find = async (userId: string) => {
		const userAvailabilities = await AvailabilityModel.find({
			owner: userId,
		});
		return userAvailabilities;
	};

	updateById = async (id: string, data: IAvailability) => {
		const availability = await AvailabilityModel.findByIdAndUpdate(
			id,
			{
				...data,
			},
			{ new: true },
		);
		return availability;
	};

	deleteById = async (id: string) => {
		await AvailabilityModel.findByIdAndDelete(id);
		return { deleted: true };
	};
}

export default new AvailabilityRepository();
