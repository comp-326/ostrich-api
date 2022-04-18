import { IUserRequest } from "../interfaces"
import { listUserByEmailUseCase } from "../use-cases"

export default function makeBuildFindByEmailUserController({
	listByEmail,
}: {
	listByEmail: typeof listUserByEmailUseCase
}) {
	return async function (httpRequest: IUserRequest) {
		const { email } = httpRequest.query
		if (!email) {
			return { statusCode: 400, body: { errorMessage: "Email required" } }
		}
		const user = await listByEmail(email)
		if (user) {
			return { statusCode: 200, body: user }
		}
		return { statusCode: 404, body: { errorMessage: "User not found" } }
	}
}
