import { IUserRequest } from "../interfaces"
import { editPasswordUseCase } from "../use-cases"

export default function makeBuildEditUserPasswordController({
	update,
}: {
	update: typeof editPasswordUseCase
}) {
	return async function (httpRequest: IUserRequest) {
		const { email } = httpRequest.body
		if (!email) {
			return { statusCode: 400, body: "User email required" }
		}
		const todo = await update(email, httpRequest.body)
		return { statusCode: 200, body: todo }
	}
}
