import { IUserRepository } from "../interfaces"

export default function makeListUsersUseCase({ userDB }: { userDB: IUserRepository }) {
	return async function listUsersUseCase(limit: number, page: number) {
		const todos = await userDB.find(limit, page)
		return todos
	}
}
