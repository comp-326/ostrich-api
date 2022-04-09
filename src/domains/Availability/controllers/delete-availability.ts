import { IAvailabilityRequest } from "../interfaces"
import { removeAvailabilityUseCase } from "../use-cases"

export default function makeBuildDeleteUserController({
	remove,
}: {
	remove: typeof removeAvailabilityUseCase
}) {
	return async function (httpRequest: IAvailabilityRequest) {
		const { id } = httpRequest.params
		if (!id) {
			return {
				statusCode: 404,
				body: "User not found",
			}
		}
		await remove(id)
		return {
			statusCode: 200,
			body: { id, deleted: true },
		}
	}
}
