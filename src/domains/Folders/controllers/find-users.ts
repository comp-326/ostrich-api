import { IUserRequest } from "../interfaces"
import { listUsersUseCase } from "../use-cases"

export default function makeBuildFindUsersController({
	find,
}: {
	find: typeof listUsersUseCase
}) {
	return async function (httpRequest: IUserRequest) {
		const limit: number = httpRequest.query.limit
			? Number(httpRequest.query.limit)
			: 20
		const page: number = httpRequest.query.page
			? Number(httpRequest.query.page)
			: 1

		const users = await find(limit, page)
		console.log(users)

		if (users.length > 0) {
			return { statusCode: 200, body: { users } }
		}
		return { statusCode: 404, body: { users } }
	}
}
