import { IAvailabilityRequest } from '../interfaces';
import { listUserAvailabilityUseCase } from '../use-cases';

export default function makeBuildFindUsersController({
	find
}: {
	find: typeof listUserAvailabilityUseCase;
}){
	return async function (httpRequest: IAvailabilityRequest){
		const { userId } = httpRequest.params;
		const availability = await find(userId);

		return { statusCode: 404, body: { availability } };
	};
}
