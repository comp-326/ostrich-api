import { IAvailabilityRequest } from '../interfaces';
import { editAvailabilityUseCase } from '../use-cases';

export default function makeBuildUpdateByIdUserController({
	update
}: {
	update: typeof editAvailabilityUseCase;
}){
	return async function (httpRequest: IAvailabilityRequest){
		const { id } = httpRequest.params;
		const todo = await update(id, httpRequest.body);

		return { statusCode: 200, body: todo };
	};
}
