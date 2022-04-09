import { IAvailabilityRequest } from "../interfaces"
import { listAvailabilityById } from "../use-cases"

export default function makeBuildFindByIdController({
	listById,
}: {
	listById: typeof listAvailabilityById
}) {
	return async function (httpRequest: IAvailabilityRequest) {
		const { id } = httpRequest.params

		if (!id) {
			return {
				statusCode: 400,
				body: "id not provided",
			}
		}

		const todo = await listById(id)
		return {
			statusCode: 200,
			body: todo,
		}
	}
}
