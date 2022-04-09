import { IAvailabilityRequest } from "../interfaces"
import { editAvailabilityUseCase } from "../use-cases"

export default function makeBuildUpdateByIdUserController({
	update,
}: {
	update: typeof editAvailabilityUseCase
}) {
	return async function (httpRequest: IAvailabilityRequest) {
		const { id } = httpRequest.params
		if (!id) {
			return { statusCode: 400, body: "id required" }
		}
		const todo = await update(id, httpRequest.body)
		return { statusCode: 200, body: todo }
	}
}
