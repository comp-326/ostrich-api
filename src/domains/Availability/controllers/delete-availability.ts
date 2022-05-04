import { IAvailabilityRequest } from '../interfaces';
import { removeAvailabilityUseCase } from '../use-cases';

export default function makeBuildDeleteUserController({
	remove
}: {
	remove: typeof removeAvailabilityUseCase;
}){
	return async function (httpRequest: IAvailabilityRequest){
		const { id } = httpRequest.params;

		await remove(id);
		return {
			statusCode: 200,
			body: { id, deleted: true }
		};
	};
}
